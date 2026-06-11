import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  techTags: string[];
  selectedTechTags: string[];
  onNavigate: (tab: 'home' | 'projects' | 'about' | 'contact') => void;
  onSelectCategory: (category: 'all' | 'mobile' | 'web') => void;
  onToggleTechTag: (tag: string) => void;
  onClearTechTags: () => void;
}

export const CommandPalette = ({
  techTags,
  selectedTechTags,
  onNavigate,
  onSelectCategory,
  onToggleTechTag,
  onClearTechTags,
}: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="command-trigger btn-active-scale fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-300 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-600/20 hover:text-white sm:inline-flex"
        aria-label="Open command palette"
      >
        <span>Command</span>
        <kbd>Ctrl K</kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Portfolio command palette"
        loop
        overlayClassName="command-overlay"
        contentClassName="command-content"
      >
        <div className="command-input-wrap">
          <Command.Input placeholder="Search actions, sections, filters..." />
          <kbd>Esc</kbd>
        </div>

        <Command.List className="command-list">
          <Command.Empty className="command-empty">No command found.</Command.Empty>

          <Command.Group heading="Navigation">
            <Command.Item
              value="Go to hero profile introduction"
              keywords={['home', 'profile', 'intro']}
              onSelect={() => runCommand(() => onNavigate('home'))}
            >
              <span>Go to Intro</span>
              <small>Home</small>
            </Command.Item>
            <Command.Item
              value="Go to projects"
              keywords={['work', 'portfolio', 'case studies']}
              onSelect={() => runCommand(() => onNavigate('projects'))}
            >
              <span>Go to Projects</span>
              <small>#projects</small>
            </Command.Item>
            <Command.Item
              value="Download resume CV"
              keywords={['resume', 'cv', 'download']}
              onSelect={() => runCommand(() => {
                const resumeWindow = window.open('/Portfolio/resume/Marjames_Cayube_RESUME.pdf', '_blank', 'noopener,noreferrer');
                if (resumeWindow) resumeWindow.opener = null;
              })}
            >
              <span>Open Resume</span>
              <small>PDF</small>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Theme">
            <Command.Item
              value={`Switch theme ${theme === 'dark' ? 'light' : 'dark'}`}
              keywords={['dark mode', 'light mode', 'appearance']}
              onSelect={() => runCommand(toggleTheme)}
            >
              <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
              <small>Theme</small>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Project Type">
            {(['all', 'mobile', 'web'] as const).map((category) => (
              <Command.Item
                key={category}
                value={`Show ${category} projects`}
                keywords={['filter', category, 'projects']}
                onSelect={() => runCommand(() => {
                  onNavigate('projects');
                  onSelectCategory(category);
                })}
              >
                <span>Show {category === 'all' ? 'All' : category[0].toUpperCase() + category.slice(1)} Projects</span>
                <small>Filter</small>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Tech Stack">
            {techTags.map((tag) => {
              const isSelected = selectedTechTags.includes(tag);

              return (
                <Command.Item
                  key={tag}
                  value={`Toggle ${tag} filter`}
                  keywords={['tech', 'stack', 'filter', tag]}
                  onSelect={() => runCommand(() => onToggleTechTag(tag))}
                >
                  <span>{isSelected ? 'Remove' : 'Filter by'} {tag}</span>
                  <small>{isSelected ? 'Active' : 'Tech'}</small>
                </Command.Item>
              );
            })}
            <Command.Item
              value="Clear tech filters"
              keywords={['clear', 'reset', 'filters']}
              onSelect={() => runCommand(onClearTechTags)}
            >
              <span>Clear Tech Filters</span>
              <small>Reset</small>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
};
