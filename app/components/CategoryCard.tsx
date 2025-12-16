import Image from "next/image";
import Link from "next/link";

type Props = {
    id: string;
    name: string;
    image: string | null;
};

export default function CategoryCard({ id, name, image }: Props) {
    return (
        <Link href={`/category/${id}`} className="group">
            {/* Conteneur principal de la carte */}
            <div className="rounded-lg bg-white shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md"  id="categories">

                {/* Conteneur de l'image avec hauteur fixe h-36 */}
                <div className="h-36 bg-gray-200 relative overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            // Les tailles sont arbitraires pour next/image, mais le style CSS h-36 est appliqué
                            width={300}
                            height={144} // 144px pour h-36
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                            <span className="text-gray-400 text-sm">Pas d'image</span>
                        </div>
                    )}
                </div>

                {/* Contenu textuel centré */}
                <div className="p-3 text-center">
                    <h3 className="font-medium text-gray-900 text-base">
                        {name}
                    </h3>
                </div>
            </div>
        </Link>
    );
}