import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {
    const createSnippet = async (formData: FormData) => {
        'use server';

        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        try {
            const snippet = await db.snippet.create({
                data: {
                    code: code,
                    title: title
                }
            })     
            console.log(snippet);            
        } catch (error) {
            throw new Error('some exceptions');
        } finally {
            redirect("/")
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form className="w-1/2 mx-auto border rounded p-3" action={createSnippet}>
                <h3 className="font-bold mb-5">Create a Snippet</h3>
                <div className="space-y-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <label htmlFor="title" className="w-12">Title:</label>
                            <input type="text" name="title" className="border rounded p-3 w-full" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <label htmlFor="code" className="w-12">Code:</label>
                            <textarea name="code" className="border rounded p-3 w-full" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full border rounded p-2 bg-blue-200">Create</button>
                </div>
            </form>
        </div>
    )
}