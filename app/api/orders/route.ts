import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const VERIFIED_EMAILS = [
  'kingmetzo1@gmail.com',
  'mouhamad.mbadj@gmail.com'
];

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email?: string | null;
  phone: string;
  address?: string;
  notes?: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(price);
}

function generateOrderHTML(
  customer: CustomerInfo,
  items: OrderItem[],
  total: number
): string {
  console.log(
    'Images reçues dans l’email:',
    items.map((item, index) => ({
      index,
      name: item.name,
      image: item.image
    }))
  );
  const itemsHTML = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;"
        />
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">Récapitulatif de votre commande</h2>
      
      <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
        <h3 style="margin-top: 0; color: #333;">Informations client</h3>
        <p><strong>Nom complet :</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Téléphone :</strong> ${customer.phone}</p>
        ${customer.email ? `<p><strong>Email :</strong> ${customer.email}</p>` : ''}
        ${customer.address ? `<p><strong>Adresse :</strong> ${customer.address}</p>` : ''}
        ${customer.notes ? `<p><strong>Notes :</strong> ${customer.notes}</p>` : ''}
      </div>

      <h3 style="margin-top: 25px; color: #333;">Détails de la commande</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Produit</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Désignation</th>
            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Quantité</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Prix unitaire</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="text-align: right; padding: 10px; border-top: 2px solid #ddd;"><strong>Total général :</strong></td>
            <td style="text-align: right; padding: 10px; border-top: 2px solid #ddd;"><strong>${formatPrice(total)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div style="margin-top: 25px; padding: 15px; background-color: #f0f8ff; border-radius: 5px; text-align: center;">
        <p style="margin: 0; color: #0066cc;">Merci pour votre confiance ! Votre commande a bien été enregistrée.</p>
        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">
          Notre équipe vous contactera bientôt pour confirmer votre commande.
        </p>
      </div>
    </div>
  `;
}

async function sendOrderEmails(customer: CustomerInfo, items: OrderItem[], total: number) {
  const adminEmails = (process.env.ADMIN_EMAILS?.split(',') || [])
    .map(email => email.trim())
    .filter(email => VERIFIED_EMAILS.includes(email));

  if (adminEmails.length === 0) {
    adminEmails.push('kingmetzo1@gmail.com');
  }

  try {
    const orderHTML = generateOrderHTML(customer, items, total);
    const orderText = `Nouvelle commande de ${customer.firstName} ${customer.lastName}
    
Produits commandés:
${items.map(item => `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n')}

Total: ${formatPrice(total)}

Informations client:
Nom: ${customer.firstName} ${customer.lastName}
Téléphone: ${customer.phone}
${customer.email ? `Email: ${customer.email}\n` : ''}${customer.address ? `Adresse: ${customer.address}\n` : ''}${customer.notes ? `Notes: ${customer.notes}\n` : ''}`;

    // Email au client (uniquement s'il est vérifié)
    if (customer.email) {
      console.log('Envoi email client à:', customer.email);
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: customer.email,
        subject: `Confirmation de votre commande`,
        html: orderHTML,
        text: orderText
      });
    }

    // Email aux administrateurs
    const adminEmailPromises = adminEmails.map(async (email) => {
      return resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: `[COMMANDE] Nouvelle commande de ${customer.firstName} ${customer.lastName}`,
        html: orderHTML.replace(
          'Récapitulatif de votre commande',
          `Nouvelle commande de ${customer.firstName} ${customer.lastName}`
        ),
        text: `NOUVELLE COMMANDE\n\n${orderText}`
      });
    });

    await Promise.all(adminEmailPromises);
    console.log('Tous les emails ont été envoyés avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    console.log('Début du traitement de la commande...');
    const { customer, items, total } = await request.json();
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY manquant dans les variables d'environnement");
    }

    if (
      !customer ||
      typeof customer.firstName !== "string" ||
      typeof customer.lastName !== "string" ||
      typeof customer.phone !== "string" ||
      !items ||
      !Array.isArray(items) ||
      typeof total !== "number"
    ) {
      throw new Error("Données de commande invalides");
    }

    const orderTotal = Number.isFinite(total) ? Math.round(total) : 0;

    const productIds = items.map((item: any) => item.id);
    const foundProducts = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
      },
    });

    const foundIds = new Set(foundProducts.map((p) => p.id));
    const missingIds = productIds.filter((id: any) => !foundIds.has(id));
    if (missingIds.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Produits introuvables: ${missingIds.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const createdOrder = await prisma.order.create({
      data: {
        customerFirstName: customer.firstName,
        customerLastName: customer.lastName,
        customerEmail: customer.email || null,
        customerPhone: customer.phone,
        customerAddress: customer.address || null,
        customerNotes: customer.notes || null,
        total: orderTotal,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      } as any,
    });

    console.log('Données reçues:', { 
      customer: { 
        name: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        email: customer.email || 'non fourni'
      },
      itemsCount: items.length,
      total: formatPrice(total)
    });

    await sendOrderEmails(customer, items, total);
    
    return NextResponse.json({
      success: true,
      message: 'Commande enregistrée avec succès',
      orderId: createdOrder.id,
    });
  } catch (error) {
    console.error('Erreur complète:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors du traitement de votre commande' 
      },
      { status: 500 }
    );
  }
}