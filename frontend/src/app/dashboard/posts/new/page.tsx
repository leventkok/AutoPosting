import { PostForm } from "@/app/components/dashboard/PostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function NewPostPage(){
    return(
        <div className="p-8">
            <div className="mb-8">
                <Link
                    href='/dashboard/posts'
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4"/>
                    <span>Geri Dön</span>
                </Link>
                <h1 className="text-3xl font-bold text-white mb-2">
                    Yeni Gönderi Oluştur
                </h1>
                <p className="text-gray-400">
                    Sosyal medya için paylaşım hazırlayın
                </p>
            </div>

            <div className="max-w-3xl">
                <PostForm/>
            </div>
        </div>
    )
}