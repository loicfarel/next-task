"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "task_categories";

export default function CategorySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (category: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Appliquer le focus sur l'input quand on ouvre le menu
  useEffect(() => {
    if (searchTerm && open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
    if (!open) setSearchTerm("");
  }, [open, searchTerm]);

  const addCategory = () => {
    if (searchTerm && !categories.includes(searchTerm)) {
      const updatedCategories = [...categories, searchTerm];
      setCategories(updatedCategories);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
      setOpen(false); // Fermer le select après ajout
      setTimeout(() => {
        onChange(searchTerm); // Sélectionner la nouvelle catégorie
      }, 50);
      setSearchTerm("");
      setOpen(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choisir une catégorie" />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Rechercher ou ajouter une catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-center text-gray-500 text-sm">
            Aucune catégorie trouvée
          </div>
        )}
        {filteredCategories.length === 0 && searchTerm && (
          <div className="p-2 flex justify-center">
            <Button size="sm" onClick={addCategory}>
              Ajouter
            </Button>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
