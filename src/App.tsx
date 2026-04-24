import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ShieldAlert, HeartPulse, Activity, UserPlus, Star, 
  Copy, Check, X, Maximize2, Stethoscope, Palette, Presentation, Users, Lightbulb, Upload, Edit2, Trash2
} from 'lucide-react';

const ANGLES = [
  { id: 'health_translator', icon: BookOpen, label: 'El Traductor de Ciencia', description: 'Tomas conceptos médicos o fisiológicos complejos y los traduces a lenguaje visual sencillo.', type: 'Ambos' },
  { id: 'health_mythbuster', icon: ShieldAlert, label: 'El Desmitificador', description: 'Desmontas mitos populares de salud. Construyes autoridad contra la desinformación.', type: 'Ambos' },
  { id: 'patient_journey', icon: HeartPulse, label: 'Caso Clínico Humano', description: 'Muestras la mejora tangible en la calidad de vida. Conecta salud y bienestar emocional.', type: 'Ambos' },
  { id: 'tech_vanguard', icon: Activity, label: 'Vanguardia Tecnológica', description: 'Destaca equipos modernos o tecnología láser. Vende precisión, seguridad y estatus premium.', type: 'Producto' },
  { id: 'empathy_diagnosis', icon: Stethoscope, label: 'Consulta Clínico-Empática', description: 'Captura la conexión humana entre el especialista y el paciente en un entorno profesional.', type: 'Ambos' },
  { id: 'premium_service', icon: Star, label: 'Servicio Boutique / Lujo', description: 'Instalaciones que parecen un hotel de lujo. Iluminación cálida, diseño interior impecable.', type: 'Entorno' },
  { id: 'surgical_precision', icon: Activity, label: 'Precisión Quirúrgica', description: 'Enfoque realista sobre el rigor técnico de un procedimiento y la maestría del especialista.', type: 'Producto' },
  { id: 'education_cartoon', icon: Palette, label: 'Educación Ilustrada', description: 'Estilo cartoon amigable e infográfico para explicar procesos complejos de forma divertida.', type: 'Ambos' },
  { id: 'medical_seminar', icon: Presentation, label: 'Flyer de Seminario Médico', description: 'Diseño profesional para congresos. Realista, sobrio y enfocado en la autoridad del ponente.', type: 'Entorno' },
];

const ANGLE_IMAGES: Record<string, string> = {
  'health_translator': 'https://lh3.googleusercontent.com/d/1xKa-ICZSSzqFyg51Uvnz7VncRhwlrKbU=w700',
  'health_mythbuster': 'https://lh3.googleusercontent.com/d/1wDTPqhHKVFlinyvDzolvY87iD13pwlWt=w700',
  'patient_journey': 'https://lh3.googleusercontent.com/d/1qkE8NfVVEVqdMQBeDerogdgeFaFobOuy=w700',
  'tech_vanguard': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=700',
  'empathy_diagnosis': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=700',
  'premium_service': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
  'surgical_precision': 'https://images.unsplash.com/photo-1584982205567-2780e0717cb6?auto=format&fit=crop&q=80&w=700',
  'education_cartoon': 'https://images.unsplash.com/photo-1616464917637-a35974052af5?auto=format&fit=crop&q=80&w=700',
  'medical_seminar': 'https://images.unsplash.com/photo-1540575467063-178550186987?auto=format&fit=crop&q=80&w=700',
};

const STYLE_PRESETS = [
  { label: 'Clínico Premium', value: 'Pristine white clinical environment, sterile aesthetic, razor-sharp focus, bright clean softbox lighting, high-end professional healthcare feel' },
  { label: 'Minimalismo Médico', value: 'Ethical and professional medical aesthetic, soft blues and whites, focused lighting on human interaction, trust-inspiring, clean composition' },
  { label: 'Cinematográfico', value: 'Cinematic lighting, dramatic shadows, 8k resolution, highly detailed volumetric lighting' },
  { label: 'Retrato Ejecutivo', value: 'Professional headshot style, clean blurred office or clinic background, soft three-point lighting, authoritative and approachable' },
  { label: 'Aesthetic Natural (Bienestar)', value: 'Earthy tones, natural sunlight, organic textures, warm atmosphere, holistic wellness aesthetic' },
  { label: 'Estudio Brillante', value: 'Bright and airy photo studio, seamless white backdrop, soft diffused flat lighting' }
];

const TYPOGRAPHY_PRESETS = [
  { label: 'Gigante y Gruesa', value: 'Massive Modern Grotesk bold sans-serif, screen-filling typography' },
  { label: 'Lujo / Serif', value: 'Elegant Serif high-end font, gold foil texture, lavish' },
  { label: 'Minimalista Sans', value: 'Clean Minimalist Sans, wide kerning, modern and airy' },
  { label: 'Script / Manuscrita', value: 'Handwritten Script, expressive and personal' },
  { label: 'Autoridad Médica (Sans Bold)', value: 'Strong Bold Sans-Serif, authoritative clinical headlines, highly legible' },
  { label: 'Científico Técnico (Mono)', value: 'Modern Monospace font, scientific data aesthetic, precise and research-focused' },
  { label: 'Elegancia Académica (Serif)', value: 'Sophisticated Transitional Serif, academic and trustworthy, scholarly tone' },
];

export default function App() {
  // State
  const [selectedAngle, setSelectedAngle] = useState<string | null>(null);
  const [previewAngle, setPreviewAngle] = useState<typeof ANGLES[0] | null>(null);
  const [filterType, setFilterType] = useState('Todos');
  
  const [styles, setStyles] = useState<string[]>([]);
  const [typography, setTypography] = useState('');
  const [designTheme, setDesignTheme] = useState('');
  const [flyerTitle, setFlyerTitle] = useState('');
  const [flyerSubtitle, setFlyerSubtitle] = useState('');
  const [flyerBody, setFlyerBody] = useState('');
  const [doctorPhoto, setDoctorPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const filterTypes = ['Todos', 'Ambos', 'Producto', 'Entorno'];

  useEffect(() => {
    const saved = localStorage.getItem('promptHistory');
    if (saved) setPromptHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (prompt: string) => {
    const newHistory = [prompt, ...promptHistory.filter(p => p !== prompt)].slice(0, 5);
    setPromptHistory(newHistory);
    localStorage.setItem('promptHistory', JSON.stringify(newHistory));
  };
  const filteredAngles = filterType === 'Todos' ? ANGLES : ANGLES.filter(a => a.type === filterType);

  const toggleStyle = (style: string) => {
    setStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => setter(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generatePrompt = () => {
    const parts = [];

    if (selectedAngle) {
      const angle = ANGLES.find(a => a.id === selectedAngle);
      if (angle) parts.push(`Communication Angle: ${angle.label}`);
    }

    if (styles.length > 0) {
      parts.push(`Visual Style & Lighting: ${styles.join(' -- ')}`);
    }

    if (typography) {
      parts.push(`Typography Effect: ${typography}`);
    }

    if (designTheme) {
      parts.push(`Theme Context: ${designTheme}`);
    }

    if (doctorPhoto) {
      parts.push(`Include, seamlessly integrate, and feature the doctor's photo portrait within the design with natural flow and composition`);
    }

    if (logo) {
      parts.push(`Include and seamlessly integrate the clinic's brand identity logo into the design composition`);
    }

    if (flyerTitle) {
      parts.push(`Text Overlay - Main Title: "${flyerTitle}"`);
    }

    if (flyerSubtitle) {
      parts.push(`Text Overlay - Subtitle: "${flyerSubtitle}"`);
    }

    if (flyerBody) {
      parts.push(`Text Overlay - Details: "${flyerBody}"`);
    }

    let finalPrompt = parts.join(' | ');
    if (!finalPrompt) return 'Your prompt will appear here...';
    
    return `/imagine prompt: ${finalPrompt} --ar 16:9 --v 6.0`;
  };

  const handleCopy = () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt);
    saveToHistory(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setSelectedAngle(null);
    setFilterType('Todos');
    setStyles([]);
    setTypography('');
    setDoctorPhoto(null);
    setLogo(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 pb-32">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">HealthPrompt Pro</h1>
          </div>
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition-all shadow-sm"
          >
            <X className="w-4 h-4" />
            Limpiar todo
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-16">
        
        {/* SECTION 1: ANGLES */}
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Ángulo de Comunicación Clínica</h2>
            <div className="flex flex-wrap gap-2">
              {filterTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    filterType === type 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-slate-500">Selecciona el enfoque psicológico y comunicacional de tu imagen.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAngles.map(angle => {
              const AcIcon = angle.icon;
              const isSelected = selectedAngle === angle.id;
              
              return (
                <div 
                  key={angle.id}
                  onClick={() => setSelectedAngle(angle.id)}
                  className={`group relative bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                    ${isSelected ? 'border-blue-500 shadow-md ring-4 ring-blue-50' : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'}`}
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={ANGLE_IMAGES[angle.id]} 
                      alt={angle.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Expand icon */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPreviewAngle(angle); }}
                      className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    {/* Type badge */}
                    <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                      {angle.type}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-slate-800">
                          <h3 className="text-sm font-bold leading-tight">{angle.label}</h3>
                        </div>
                        <p className="text-[14px] leading-relaxed text-slate-500 line-clamp-3">
                          {angle.description}
                        </p>
                      </div>
                      
                      {/* Check indicator */}
                      <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: DESIGN INFO */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">2. Información del Diseño</h2>
            <p className="text-slate-500">Agrega el texto que deseas visualizar en el flyer.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-xl">
               <input type="text" placeholder='Tema general del diseño: "Día del médico, Beneficios de la salud, etc"' value={designTheme} onChange={(e) => setDesignTheme(e.target.value)} className="w-full p-4 border-2 rounded-xl focus:border-blue-600 border-blue-300 outline-none font-medium" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Título principal" value={flyerTitle} onChange={(e) => setFlyerTitle(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none" />
            <input type="text" placeholder="Subtítulo" value={flyerSubtitle} onChange={(e) => setFlyerSubtitle(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none" />
            <textarea placeholder="Información detallada del flyer" value={flyerBody} onChange={(e) => setFlyerBody(e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none md:col-span-2" rows={3} />
          </div>
        </section>

        {/* SECTION 3: VISUAL STYLE */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">3. Estilo Visual y Entorno (Medical Focus)</h2>
            <p className="text-slate-500">El look & feel fotográfico (Selección múltiple recomendada).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {STYLE_PRESETS.map((preset) => {
               const active = styles.includes(preset.value);
               return (
                 <div 
                   key={preset.label}
                   onClick={() => toggleStyle(preset.value)}
                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                     active
                     ? 'border-blue-500 bg-blue-50'
                     : 'border-slate-200 hover:border-slate-300 bg-white'
                   }`}
                 >
                    <div className="flex items-center gap-3">
                       <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                         active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                       }`}>
                         {active && <Check className="w-3.5 h-3.5 text-white" />}
                       </div>
                       <div>
                         <div className={`font-semibold ${active ? 'text-blue-900' : 'text-slate-800'}`}>
                           {preset.label}
                         </div>
                         <div className="text-[12px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                           {preset.value}
                         </div>
                       </div>
                    </div>
                 </div>
               )
             })}
          </div>
        </section>

        {/* SECTION 4: TYPOGRAPHY */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">4. Estilo de Títulos (Tipografía)</h2>
            <p className="text-slate-500">El estilo sugerido para textos superpuestos en diseño.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {TYPOGRAPHY_PRESETS.map((preset) => {
               const active = typography === preset.value;
               return (
                 <div 
                   key={preset.label}
                   onClick={() => setTypography(active ? '' : preset.value)}
                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                     active
                     ? 'border-indigo-500 bg-indigo-50'
                     : 'border-slate-200 hover:border-slate-300 bg-white'
                   }`}
                 >
                    <div className="space-y-1">
                      <div className={`font-semibold ${active ? 'text-indigo-900' : 'text-slate-800'}`}>
                        {preset.label}
                      </div>
                      <div className="text-[12px] text-slate-500 leading-tight">
                        {preset.value}
                      </div>
                    </div>
                 </div>
               )
             })}
          </div>
        </section>

        {/* SECTION 5: BRAND IDENTITY */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">5. Identidad de Marca</h2>
            <p className="text-slate-500">Selecciona los elementos de identidad para integrar en tu diseño.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Agregar mi foto', value: 'doctorPhoto', url: 'https://lh3.googleusercontent.com/d/1Qy_x9XnXkSTExG6geT0e7c-2M8ZyJZjo=w700' },
              { label: 'Agregar mi logotipo', value: 'logo', url: 'https://lh3.googleusercontent.com/d/1pIJmoROi5GdU4QNFmTSHab7UAzt7IzjX=w700' }
            ].map(item => {
              const active = (item.value === 'doctorPhoto' ? !!doctorPhoto : !!logo);
              return (
                <div 
                  key={item.label}
                  onClick={() => item.value === 'doctorPhoto' ? setDoctorPhoto(active ? null : item.url) : setLogo(active ? null : item.url)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    active ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`font-bold ${active ? 'text-blue-900' : 'text-slate-700'}`}>{item.label}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                    {active && <Check className="text-white w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 mt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold tracking-tight">Descargar mis recursos</h3>
            <p className="text-slate-500 mb-6">dale click a la imagen para descargarla "Mi kit médico"</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'https://lh3.googleusercontent.com/d/1Qy_x9XnXkSTExG6geT0e7c-2M8ZyJZjo=w700',
                'https://lh3.googleusercontent.com/d/1pIJmoROi5GdU4QNFmTSHab7UAzt7IzjX=w700'
              ].map((url, i) => (
                <a key={i} href={url} download target="_blank" rel="noopener noreferrer" className="block p-2 bg-white border border-slate-200 rounded-lg hover:border-blue-500 transition-all shadow-sm">
                  <img src={url} alt={`Recurso ${i+1}`} className="w-full aspect-square object-contain rounded" />
                </a>
              ))}
              {[...Array(2)].map((_, i) => (
                <div key={i + 2} className="w-full aspect-square bg-slate-100 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                  <span className="text-xs">Espacio</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: PROMPT HISTORY */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">6. Historial de Prompts</h2>
              <p className="text-slate-500">Accede y reutiliza tus prompts generados anteriormente.</p>
            </div>
            {promptHistory.length > 0 && (
              <button 
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
                    setPromptHistory([]);
                    localStorage.removeItem('promptHistory');
                  }
                }}
                className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
              >
                Limpiar todo
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Buscar en el historial..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <div className="space-y-3">
            {promptHistory.filter(h => h.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && <p className="text-slate-400 italic">No hay historial coincidente.</p>}
            {promptHistory.filter(h => h.toLowerCase().includes(searchQuery.toLowerCase())).map((h, i) => (
              <div 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${activeIndex === i ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'}`}
              >
                {editingIndex === i ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 font-mono text-sm p-2 bg-white rounded border border-blue-300"
                  />
                ) : (
                  <span className="flex-1 font-mono text-sm text-slate-700 truncate">{h}</span>
                )}
                {editingIndex === i ? (
                  <button onClick={() => {
                    const newHistory = [...promptHistory];
                    newHistory[i] = editValue;
                    setPromptHistory(newHistory);
                    localStorage.setItem('promptHistory', JSON.stringify(newHistory));
                    setEditingIndex(null);
                  }} className="text-blue-500 font-bold px-3 py-1 bg-blue-50 rounded-lg">Guardar</button>
                ) : (
                  <>
                    <button onClick={() => { setEditingIndex(i); setEditValue(h); }} className="p-2 hover:bg-slate-100 rounded text-slate-500"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => { const newHistory = [h, ...promptHistory]; setPromptHistory(newHistory); localStorage.setItem('promptHistory', JSON.stringify(newHistory)); }} className="p-2 hover:bg-slate-100 rounded text-slate-500"><Copy className="w-4 h-4" /></button>
                    <button onClick={() => { navigator.clipboard.writeText(h); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 hover:bg-slate-100 rounded text-slate-500"><Copy className="w-4 h-4" /></button>
                    <button onClick={() => { const newHistory = promptHistory.filter((_, idx) => idx !== i); setPromptHistory(newHistory); localStorage.setItem('promptHistory', JSON.stringify(newHistory)); }} className="p-2 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* CONSOLE BOTTOM SECTION */}
      <div className="fixed bottom-0 w-full bg-slate-900 text-slate-300 border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-40 p-4">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-end md:items-center">
            
            <div className="flex-1 w-full bg-black/50 border border-slate-800 rounded-lg p-4 font-mono text-[13px] leading-relaxed max-h-32 overflow-y-auto overflow-x-hidden break-words selection:bg-blue-500/30">
               <span className="text-blue-400 font-bold select-none">{'> '}</span>
               <span className="text-green-400">{generatePrompt()}</span>
            </div>

            <button 
              onClick={handleCopy}
              className={`shrink-0 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-sm transition-all duration-300 ${
                copied 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? '¡Prompt Copiado!' : 'Copiar Prompt'}
            </button>
         </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewAngle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
          onClick={() => setPreviewAngle(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={ANGLE_IMAGES[previewAngle.id]} 
                alt={previewAngle.label} 
                className="w-full h-80 object-cover" 
                referrerPolicy="no-referrer"
              />
              <button 
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                onClick={() => setPreviewAngle(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="inline-block px-3 py-1 mb-4 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {previewAngle.type}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">{previewAngle.label}</h3>
              <p className="mt-4 text-slate-600 text-lg leading-relaxed">
                {previewAngle.description}
              </p>
              
              <button 
                className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors"
                onClick={() => setPreviewAngle(null)}
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ImageUpload({ label, file, onChange }: { label: string, file: string | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 hover:border-blue-500 transition-colors bg-white">
        {file ? (
          <div className="relative aspect-video rounded-lg overflow-hidden">
             <img src={file} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
            <Upload className="w-8 h-8 text-slate-400 mb-2" />
            <span className="text-sm text-slate-500">Subir imagen</span>
            <input type="file" className="hidden" accept="image/*" onChange={onChange} />
          </label>
        )}
      </div>
    </div>
  );
}

function SelectGroup({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
        >
          <option value="">Seleccionar...</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
}
