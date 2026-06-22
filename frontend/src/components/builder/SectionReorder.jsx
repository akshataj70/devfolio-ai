import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiX, FiEye, FiEyeOff, FiMenu } from 'react-icons/fi';
import { useResumeStore } from '../../stores/useResumeStore';

// Human-readable labels and icons for each section
const SECTION_META = {
  personal: { label: 'Personal Info', icon: '👤', fixed: true },
  summary: { label: 'Professional Summary', icon: '📝' },
  experience: { label: 'Experience', icon: '💼' },
  education: { label: 'Education', icon: '🎓' },
  skills: { label: 'Skills', icon: '⚡' },
  projects: { label: 'Projects', icon: '🚀' },
  certifications: { label: 'Certifications', icon: '📜' },
  achievements: { label: 'Achievements', icon: '🏆' },
  languages: { label: 'Languages', icon: '🌐' },
  interests: { label: 'Interests', icon: '❤️' },
};

// ─────────────────────────────────────────────────────────
//  Individual Sortable Row
// ─────────────────────────────────────────────────────────
const SortableRow = ({ id, isHidden, onToggleVisibility }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const meta = SECTION_META[id] || { label: id, icon: '📄' };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
        ${isDragging
          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-200/40 dark:shadow-blue-900/40 scale-[1.02]'
          : isHidden
            ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700/50 opacity-60'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
        }
      `}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-grab active:cursor-grabbing transition-colors touch-none"
        aria-label={`Drag to reorder ${meta.label}`}
      >
        <FiMenu size={18} />
      </button>

      {/* Icon */}
      <span className="text-lg shrink-0 select-none">{meta.icon}</span>

      {/* Label */}
      <span
        className={`flex-1 text-sm font-medium select-none transition-colors ${
          isHidden
            ? 'text-gray-400 dark:text-gray-500 line-through'
            : 'text-gray-800 dark:text-gray-200'
        }`}
      >
        {meta.label}
      </span>

      {/* Visibility Toggle */}
      <button
        onClick={() => onToggleVisibility(id)}
        className={`p-1.5 rounded-lg transition-all ${
          isHidden
            ? 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
            : 'text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
        }`}
        aria-label={isHidden ? `Show ${meta.label}` : `Hide ${meta.label}`}
      >
        {isHidden ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
//  Main SectionReorder Modal
// ─────────────────────────────────────────────────────────
const SectionReorder = ({ isOpen, onClose }) => {
  const { themeSettings, reorderSections, toggleSectionVisibility } =
    useResumeStore();

  // Separate out the fixed 'personal' section from the reorderable sections.
  const reorderableSections = themeSettings.sectionOrder.filter(
    (id) => id !== 'personal'
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = themeSettings.sectionOrder.indexOf(active.id);
    const newIndex = themeSettings.sectionOrder.indexOf(over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderSections(oldIndex, newIndex);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl pointer-events-auto border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-600/10 dark:to-purple-600/10">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reorder Sections
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Drag to reorder • Click the eye to show/hide
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiX size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Fixed "Personal Info" (always first, not draggable) */}
          <div className="px-6 pt-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/40">
              <span className="p-1 text-gray-300 dark:text-gray-600">
                <FiMenu size={18} />
              </span>
              <span className="text-lg select-none">👤</span>
              <span className="flex-1 text-sm font-medium text-gray-500 dark:text-gray-400 select-none">
                Personal Info
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                Fixed
              </span>
            </div>
          </div>

          {/* Sortable List */}
          <div className="px-6 py-3 space-y-2 max-h-[55vh] overflow-y-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={reorderableSections}
                strategy={verticalListSortingStrategy}
              >
                {reorderableSections.map((sectionId) => (
                  <SortableRow
                    key={sectionId}
                    id={sectionId}
                    isHidden={themeSettings.hiddenSections.includes(sectionId)}
                    onToggleVisibility={toggleSectionVisibility}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {themeSettings.hiddenSections.length > 0
                ? `${themeSettings.hiddenSections.length} section${themeSettings.hiddenSections.length > 1 ? 's' : ''} hidden`
                : 'All sections visible'}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all hover:scale-105"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionReorder;
