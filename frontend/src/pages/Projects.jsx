import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiCopy,
  FiFolder,
  FiGithub,
  FiExternalLink,
  FiSearch,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Mock projects data
const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'Devfolio AI',
    description: 'AI-powered resume and portfolio builder',
    techStack: ['React', 'Node.js', 'MongoDB'],
    github: 'github.com/devfolio',
    liveDemo: 'devfolio.ai',
    status: 'Published',
    lastUpdated: '2024-01-15',
    views: 1250,
  },
  {
    id: '2',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with payment integration',
    techStack: ['Next.js', 'Stripe', 'PostgreSQL'],
    github: 'github.com/ecommerce',
    liveDemo: 'shop.example.com',
    status: 'Draft',
    lastUpdated: '2024-01-10',
    views: 450,
  },
  {
    id: '3',
    name: 'Portfolio Website',
    description: 'Personal portfolio with CMS integration',
    techStack: ['React', 'Tailwind', 'Framer Motion'],
    github: 'github.com/portfolio',
    liveDemo: 'akash.dev',
    status: 'Published',
    lastUpdated: '2024-01-05',
    views: 890,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
      case 'Draft': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      case 'Archived': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || project.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleDuplicate = (id) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      const newProject = {
        ...project,
        id: Date.now().toString(),
        name: `${project.name} (Copy)`,
        status: 'Draft',
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setProjects([...projects, newProject]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
          >
            <FiPlus size={20} />
            New Project
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Create your first project to showcase your work</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Project Preview */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <FiFolder size={48} className="text-gray-400 dark:text-gray-500" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>👁️ {project.views}</span>
                      <span>📅 {project.lastUpdated}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDuplicate(project.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Duplicate"
                      >
                        <FiCopy size={16} className="text-gray-500 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => navigate(`/builder?id=${project.id}`)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={16} className="text-gray-500 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    {project.github && (
                      <a
                        href={`https://${project.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                      >
                        <FiGithub size={12} /> GitHub
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={`https://${project.liveDemo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                      >
                        <FiExternalLink size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {projects.filter(p => p.status === 'Published').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {projects.filter(p => p.status === 'Draft').length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Drafts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;