import { useState } from "react";
import { useXPStore } from "../store/useXPStore";

export default function TaskForm() {
    const additionalTask = useXPStore((state) => state.addTask);
    const [xpValue, setXpValue] = useState(0);

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formInfo = new FormData(form);
        const submittedCategory = formInfo.get("category") as string;
        const formattedCategory =
            submittedCategory.charAt(0).toUpperCase() + submittedCategory.slice(1).toLowerCase();

        const newTask = {
            id: crypto.randomUUID(),
            title: formInfo.get("title") as string,
            category: formattedCategory,
            xp: xpValue,
            note: formInfo.get("note") as string,
            date: new Date().toLocaleDateString(),
        };
        additionalTask(newTask);
        setXpValue(0);
        form.reset();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border border-black rounded-md bg-white shadow-md">
            <h2 className="text-xl text-black font-semibold mb-4"> Add New Task </h2>
            <div className="mb-4">
                <label className="block text-black mb-1 font-medium" htmlFor="title"> Activity </label>
                <input
                    className="w-full text-black text-center border border-black p-2 rounded-md"
                    type="text"
                    id="title"
                    name="title"
                    required
                    list="title-suggestions"
                />
            </div>
            <div className="mb-4">
                <label className="block text-black mb-1 font-medium" htmlFor="category"> Category </label>
                <input
                    className="w-full text-black border text-center border-black p-2 rounded-md"
                    type="text"
                    id="category"
                    name="category"
                    required
                    list="category-suggestions"
                />
                <datalist id="category-suggestions">
                    <option value="Coding" />
                    <option value="Job Hunting" />
                    <option value="AI Learning" />
                    <option value="Personal" />
                </datalist>
            </div>
            <div className="mb-4">
                <label className="block text-black mb-1 font-medium" htmlFor="xp"> XP </label>
                <div className="flex gap-2">
                    <input
                        className="w-full text-black text-center border border-black p-2 rounded-md"
                        type="number"
                        id="xp"
                        name="xp"
                        required
                        value={xpValue}
                        min={0}
                        onChange={e => setXpValue(Math.max(0, Number(e.target.value)))}
                    />
                </div>
            <div className="flex gap-2 mt-2 justify-center">
                <button
                    type="button"
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    onClick={() => setXpValue(Math.max(0, xpValue - 100))}
                        >-100
                </button>
                <button
                    type="button"
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    onClick={() => setXpValue(Math.max(0, xpValue - 10))}
                    >-10
                </button>
                <button
                    type="button"
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    onClick={() => setXpValue(xpValue + 10)}
                    >+10
                </button>
                <button
                    type="button"
                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    onClick={() => setXpValue(xpValue + 100)}
                    >+100
                </button>
            </div>
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-black font-medium" htmlFor="note"> Note </label>
                <textarea className="w-full text-black border border-black p-2 rounded-md" id="note" name="note" rows={3}></textarea>
            </div>
            <button className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600 transition" type="submit"> Add Task </button>
        </form>
    )
}