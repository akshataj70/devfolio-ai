import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

const ProjectsForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResumeStore();
  const data = resumeData.projects;

  // Local state for handling the "new tech" input per project
  const [newTechInputs, setNewTechInputs] = useState({});

  const handleAdd = () => {
    addListItem('projects', {
      name: '',
      description: '',
      techStack: [],
      github: '',
      liveDemo: '',
    });
  };

  const addTech = (id) => {
    const tech = newTechInputs[id];
    if (tech && tech.trim()) {
      const project = data.find(p => p.id === id);
      if (project) {
        updateListItem('projects', id, {
          techStack: [...(project.techStack || []), tech.trim()]
        });
        setNewTechInputs({ ...newTechInputs, [id]: '' });
      }
    }
  };

  const removeTech = (projectId, techIndex) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newTechStack = project.techStack.filter((_, i) => i !== techIndex);
      updateListItem('projects', projectId, { techStack: newTechStack });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Showcase your best projects</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={16} />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 space-y-3 relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeListItem('projects', project.id)}
                  className="text-red-500 hover:text-red-600 p-1 bg-red-50 dark:bg-red-900/20 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="space-y-3 pr-10">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateListItem('projects', project.id, { name: e.target.value })}
                    placeholder="e.g., E-commerce Platform"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateListItem('projects', project.id, { description: e.target.value })}
                    rows={3}
                    placeholder="Describe the project, your role, and the impact..."
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm font-mono"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={project.github}
                      onChange={(e) => updateListItem('projects', project.id, { github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      value={project.liveDemo}
                      onChange={(e) => updateListItem('projects', project.id, { liveDemo: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tech Stack</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechInputs[project.id] || ''}
                      onChange={(e) => setNewTechInputs({ ...newTechInputs, [project.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech(project.id))}
                      placeholder="Add technology (e.g., React)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={() => addTech(project.id)}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(project.techStack || []).map((tech, ti) => (
                      <span
                        key={ti}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 text-xs"
                      >
                        {tech}
                        <button
                          onClick={() => removeTech(project.id, ti)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <FiX size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsForm;
