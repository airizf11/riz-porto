// src/app/(admin)/mudir/aichat/client-page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useState,
  useTransition, // FormEvent,
  useRef,
  useActionState,
} from "react";
import {
  // useFormState,
  useFormStatus,
} from "react-dom";
import {
  addManualKnowledge,
  deleteManualKnowledge,
  updateManualKnowledge,
  generateEmbeddings,
  type GenerateEmbeddingsState,
} from "./actions";
import {
  BrainCircuit,
  Loader,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertTriangle,
} from "lucide-react";

// Definisikan tipe untuk item pengetahuan agar kode lebih aman
type KnowledgeItemData = {
  id: string;
  content: string;
  created_at: string;
};

// Komponen Tombol Generate Memory
function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:bg-primary/50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader className="animate-spin" /> Generating Memory...
        </>
      ) : (
        <>
          <BrainCircuit /> Generate & Store AI Memory
        </>
      )}
    </button>
  );
}

// Komponen untuk satu baris "fakta" yang bisa diedit
function KnowledgeItem({ item }: { item: KnowledgeItemData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = async (formData: FormData) => {
    startTransition(async () => {
      await updateManualKnowledge(formData);
      setIsEditing(false);
    });
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this fact? You'll need to re-generate memory afterwards."
      )
    ) {
      startTransition(async () => {
        await deleteManualKnowledge(item.id);
      });
    }
  };

  return (
    <div className="flex items-start gap-4 bg-dark/50 p-3 rounded-lg border border-light/10">
      {isEditing ? (
        <form
          action={handleUpdate}
          className="flex-grow flex items-center gap-2"
        >
          <input type="hidden" name="id" value={item.id} />
          <textarea
            name="content"
            defaultValue={item.content}
            rows={3}
            className="flex-grow p-2 bg-neutral-900 rounded border border-secondary focus:ring-2 focus:ring-secondary outline-none"
          ></textarea>
          <button
            type="submit"
            disabled={isPending}
            className="p-2 text-green-400 hover:bg-green-900/50 rounded-full disabled:opacity-50"
          >
            <Save size={18} />
          </button>
        </form>
      ) : (
        <p className="flex-grow text-light/80 py-2 px-1">{item.content}</p>
      )}

      <div className="flex flex-col gap-2 flex-shrink-0">
        <button
          onClick={() => setIsEditing(!isEditing)}
          disabled={isPending}
          className="p-2 text-secondary hover:bg-secondary/20 rounded-full disabled:opacity-50"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="p-2 text-red-500 hover:bg-red-900/50 rounded-full disabled:opacity-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

// Komponen Utama Dasbor AI
export default function AiDashboardClient({
  initialKnowledge,
}: {
  initialKnowledge: KnowledgeItemData[];
}) {
  const initialState: GenerateEmbeddingsState = {
    message: "",
    success: false,
    processedCount: 0,
  };
  const [state, formAction] = useActionState(generateEmbeddings, initialState);

  // Menggunakan useTransition untuk form "Add Fact" agar UI tidak terasa macet
  const [isAddPending, startAddTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddSubmit = async (formData: FormData) => {
    startAddTransition(async () => {
      await addManualKnowledge(formData);
      formRef.current?.reset(); // Reset form setelah berhasil
    });
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-bold">AI Chat Management</h2>
        <p className="text-light/60 mt-2">
          Manage the knowledge base that powers your personal AI assistant,
          Rizi-Bot.
        </p>
      </header>

      <section className="bg-dark p-6 rounded-lg border border-light/10 space-y-6">
        <h3 className="text-xl font-bold">Manual Knowledge</h3>
        <div>
          <h4 className="font-semibold mb-2 text-light">Add New Fact</h4>
          <p className="text-sm text-light/70 mb-3">
            Add specific facts (e.g., "Riziyan's favorite framework is
            Next.js.") to enrich the AI's knowledge.
          </p>
          <form
            ref={formRef}
            action={handleAddSubmit}
            className="flex items-start gap-4"
          >
            <textarea
              name="content"
              placeholder="Enter a new fact here..."
              rows={3}
              className="flex-grow p-2 bg-neutral-800 rounded border border-light/20 focus:ring-accent focus:ring-2 outline-none"
              required
              minLength={10}
            ></textarea>
            <button
              type="submit"
              disabled={isAddPending}
              className="bg-secondary text-dark font-bold rounded-lg px-6 py-2.5 flex items-center gap-2 self-stretch disabled:opacity-50"
            >
              {isAddPending ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Plus size={18} />
              )}{" "}
              Add
            </button>
          </form>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-light">Existing Facts</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2 border-t border-light/10 pt-4">
            {initialKnowledge.length > 0 ? (
              initialKnowledge.map((item) => (
                <KnowledgeItem key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center text-light/50 py-4">
                No manual facts added yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-dark p-6 rounded-lg border border-light/10">
        <h3 className="text-xl font-bold">Knowledge Base Generation</h3>
        <div className="flex items-start gap-3 p-4 my-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-yellow-300">
          <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
          <p className="text-sm">
            After adding, editing, or deleting any facts or website content
            (articles/projects), you must re-generate the AI memory for the
            changes to take effect. This process can take a moment.
          </p>
        </div>
        <form action={formAction}>
          <GenerateButton />
        </form>
        {state.message && (
          <div
            className={`mt-6 p-4 rounded-lg border ${
              state.success
                ? "bg-green-900/50 border-green-500/30"
                : "bg-red-900/50 border-red-500/30"
            }`}
          >
            <p
              className={`font-semibold ${
                state.success ? "text-green-300" : "text-red-400"
              }`}
            >
              {state.success ? "Success!" : "Error!"}
            </p>
            <p className="text-light/80 mt-1">{state.message}</p>
          </div>
        )}
      </section>
    </div>
  );
}
