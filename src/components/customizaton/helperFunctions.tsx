import { User, ArrowUpRight, LinkIcon } from 'lucide-react';
import customizationUtils from './utils'; // Import the customization utils

// Import your FieldType from types.ts
import FieldType from './types';

// Helper functions for field management
export const addField = (fields: FieldType[],   setFields: React.Dispatch<React.SetStateAction<FieldType[]>>
) => {
  const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
  setFields([...fields, {
    id: newId,
    title: '',
    link: '',
    image: '',
    type: 'default',
    animation: 'none'
  }]);
};

export const deleteField = (id: number, fields: FieldType[], setFields: React.Dispatch<React.SetStateAction<FieldType[]>>) => {
  setFields(fields.filter((field) => field.id !== id));
};

export const updateField = (
  id: number, 
  key: keyof FieldType, 
  value: string | number | boolean, 
  fields: FieldType[], 
  setFields: React.Dispatch<React.SetStateAction<FieldType[]>>
) => {
  setFields(fields.map((field) =>
    field.id === id ? { ...field, [key]: value } : field
  ));
};

// Drag and drop functions
export const handleDragStart = (
  id: number, 
  setDraggingField: React.Dispatch<React.SetStateAction<number | null>>
) => {
  setDraggingField(id);
};

export const handleDragOver = (
  e: React.DragEvent, 
  id: number, 
  fields: FieldType[], 
  draggingField: number | null, 
  setFields: React.Dispatch<React.SetStateAction<FieldType[]>>
) => {
  e.preventDefault();
  if (draggingField === null || draggingField === id) return;

  const draggedItemIndex = fields.findIndex(field => field.id === draggingField);
  const targetIndex = fields.findIndex(field => field.id === id);

  if (draggedItemIndex === -1 || targetIndex === -1) return;

  const newFields = [...fields];
  const draggedItem = newFields[draggedItemIndex];

  // Remove the dragged item
  newFields.splice(draggedItemIndex, 1);
  // Insert at the target position
  newFields.splice(targetIndex, 0, draggedItem);

  setFields(newFields);
};

export const handleDrop = (
  e: React.DragEvent, 
  setDraggingField: React.Dispatch<React.SetStateAction<number | null>>
) => {
  e.preventDefault();
  setDraggingField(null);
};

export const handleDragEnd = (
  setDraggingField: React.Dispatch<React.SetStateAction<number | null>>
) => {
  setDraggingField(null);
};

// Avatar handling functions
export const handleAvatarClick = (
  avatarInputRef: React.RefObject<HTMLInputElement>
) => {
  if (avatarInputRef.current) {
    avatarInputRef.current.click();
  }
};

export const handleAvatarUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>,
  setAvatar: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.target.files && e.target.files[0]) {
    setAvatarFile(e.target.files[0]);
    setAvatar(''); // Clear URL if we're using a file
  }
};

export const handleAvatarDrop = (
  e: React.DragEvent<HTMLDivElement>,
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>,
  setAvatar: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    setAvatarFile(e.dataTransfer.files[0]);
    setAvatar(''); // Clear URL if we're using a file
  }
};

export const handleAvatarDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

// Handle link icon upload
export const handleLinkIconUpload = (
  id: number, 
  e: React.ChangeEvent<HTMLInputElement>,
  fields: FieldType[],
  setFields: React.Dispatch<React.SetStateAction<FieldType[]>>
) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateField(id, 'image', reader.result as string, fields, setFields);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};

// Styling functions
export const getGradientClasses = (selectedTheme: typeof customizationUtils.themeOptions[0]) => {
  return `bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`;
};

export const getButtonClasses = (
  selectedTheme: typeof customizationUtils.themeOptions[0], 
  roundedCorners: boolean, 
  showBorders: boolean, 
  showShadows: boolean, 
  selectedLayout: typeof customizationUtils.layoutTemplates[0]
) => {
  let classes = `mb-3 p-3 ${getGradientClasses(selectedTheme)} flex items-center justify-between `;

  if (roundedCorners) {
    classes += 'rounded-lg ';
  }

  if (showBorders) {
    classes += 'border border-gray-700/30 ';
  }

  if (showShadows) {
    classes += 'shadow-md ';
  }

  if (selectedLayout.id === 'compact') {
    classes += 'py-2 ';
  } else if (selectedLayout.id === 'minimal') {
    classes += 'bg-opacity-90 border-0 ';
  }

  return classes;
};

export const getAnimationClass = (animation: string) => {
  switch (animation) {
    case 'pulse': return 'hover:animate-pulse';
    case 'scale': return 'transition-transform hover:scale-102';
    case 'slide': return 'transition-transform hover:translate-x-1';
    default: return '';
  }
};

export const saveChanges = (
  setSavedMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setModified: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setSavedMessage(true);
  setModified(false);

  setTimeout(() => {
    setSavedMessage(false);
  }, 3000);
};

export const getLinkIcon = (field: FieldType) => {
  // If the field has a custom image, use that
  if (field.image) {
    return (
      <div className="w-4 h-4 mr-3 flex-shrink-0">
        <img src={field.image} alt="" className="w-full h-full object-cover rounded" />
      </div>
    );
  }
  
  // Otherwise use the type icon
  const linkType = customizationUtils.linkTypes.find(lt => lt.id === field.type);
  return <span className="mr-3">{linkType ? linkType.icon : <LinkIcon size={16} />}</span>;
};

// Function to render the preview layout
export const renderPreview = (
  selectedLayout: typeof customizationUtils.layoutTemplates[0],
  showAvatar: boolean,
  showBorders: boolean,
  selectedTheme: typeof customizationUtils.themeOptions[0],
  avatarFile: File | null,
  avatarPreview: string | null,
  avatar: string,
  displayName: string,
  showBio: boolean,
  bio: string,
  fields: FieldType[],
  buttonFullWidth: boolean,
  showLinkIcons: boolean
) => {
  const containerClasses = selectedLayout.id === 'grid'
    ? 'grid grid-cols-2 gap-3'
    : 'flex flex-col';

  return (
    <div className="max-w-md mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        {showAvatar && (
          <div className={`w-20 h-20 rounded-full overflow-hidden ${showBorders ? 'border-2 ' + selectedTheme.borderColor : ''} mb-3`}>
            {avatarFile && avatarPreview ? (
              <img src={avatarPreview} alt={displayName} className="w-full h-full object-cover" />
            ) : avatar ? (
              <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${getGradientClasses(selectedTheme)}`}>
                <User size={32} className="text-white" />
              </div>
            )}
          </div>
        )}
        <h1 className={`text-xl font-semibold ${selectedTheme.textColor}`}>{displayName}</h1>
        {showBio && bio && (
          <p className={`text-center text-sm mt-2 ${selectedTheme.textColor} max-w-xs opacity-80`}>
            {bio}
          </p>
        )}
      </div>

      {/* Links */}
      <div className={containerClasses}>
        {fields.filter(f => !f.hidden).map((field) => (
          <a
            key={field.id}
            href={field.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${getButtonClasses(selectedTheme, showBorders, showBorders, true, selectedLayout)} ${getAnimationClass(field.animation || 'none')} ${!buttonFullWidth && selectedLayout.id !== 'grid' ? 'self-center max-w-xs' : 'w-full'}`}
          >
            <div className="flex items-center">
              {showLinkIcons && getLinkIcon(field)}
              <span className={selectedTheme.textColor}>{field.title}</span>
            </div>
            <ArrowUpRight size={16} className={selectedTheme.textColor} />
          </a>
        ))}
      </div>
    </div>
  );
};