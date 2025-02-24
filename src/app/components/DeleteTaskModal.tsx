import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onConfirm: () => void;
};

export function DeleteTaskModal({ onConfirm }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Supprimer
      </Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
