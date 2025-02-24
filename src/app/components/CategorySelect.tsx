"use client";

import { useState, useEffect } from "react";
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
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
    }
  }, [open]);

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
    }
  };

  // Filtrer les catégories en fonction de la recherche
  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={(isOpen) => {
        if (!isTyping) setOpen(isOpen);
      }} // Ne ferme pas si on tape dans l'input
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choisir une catégorie" />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Rechercher ou ajouter une catégorie..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onBlur={() => setIsTyping(false)} // Remet à false quand on quitte l'input
            autoFocus
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
