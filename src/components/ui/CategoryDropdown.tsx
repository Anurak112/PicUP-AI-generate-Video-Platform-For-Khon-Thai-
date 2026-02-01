'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Category } from '@/types/video';
import './CategoryDropdown.css';

export interface CategoryDropdownProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
    label?: string;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
    label = 'Category'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedCat = categories.find(cat => cat.id === selectedCategory);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const handleSelect = (categoryId: string) => {
        onSelectCategory(categoryId);
        setIsOpen(false);
    };

    return (
        <div className="category-dropdown" ref={dropdownRef}>
            {label && <label className="dropdown-label">{label}</label>}

            <button
                className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="dropdown-trigger-content">
                    {selectedCat?.icon && <span className="category-icon">{selectedCat.icon}</span>}
                    <span className="category-name">{selectedCat?.name || 'Select Category'}</span>
                    {selectedCat?.count !== undefined && selectedCat.count > 0 && (
                        <span className="category-count">{selectedCat.count}</span>
                    )}
                </span>
                <ChevronDown size={20} className={`dropdown-chevron ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="dropdown-menu" role="listbox">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`dropdown-item ${selectedCategory === category.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(category.id)}
                            role="option"
                            aria-selected={selectedCategory === category.id}
                        >
                            <div className="dropdown-item-content">
                                <span className="category-icon">{category.icon}</span>
                                <div className="category-info">
                                    <span className="category-name">{category.name}</span>
                                    {category.description && (
                                        <span className="category-description">{category.description}</span>
                                    )}
                                </div>
                            </div>
                            <div className="dropdown-item-meta">
                                {category.count !== undefined && category.count > 0 && (
                                    <span className="category-count">{category.count}</span>
                                )}
                                {selectedCategory === category.id && (
                                    <Check size={18} className="check-icon" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
