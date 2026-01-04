import { ArrowLeft, Plus, X, GripVertical, Palette, Save, BookCopy, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProccesSchema } from '@/interfaces';

interface ColorScheme {
    name: string;
    gradient: string;
    accentGradient: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    border: string;
    hover: string;
    shadow: string;
    bgMain: string;
    bgCard: string;
    bgInput: string;
    bgButton: string;
    bgButtonSecondary: string;
}

interface FormData {
    schemaName: string;
}

interface ConfigLabels {
    [key: string]: string[];
}

interface ProgressData {
    id: string;
    currentStep: number;
    formData: FormData;
    advancedOptions: string[];
    configLabels: ConfigLabels;
    schemaLabels: string[];
    colorSchemeIndex: number;
    savedAt: string;
}

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

interface ConfirmModal {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    type: 'warning' | 'danger' | 'info' | 'success';
    showCancelButton?: boolean;
}

interface NewSchemaFormProps {
    setShowNewSchemaForm: (show: boolean) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    handleSubmit: (e: React.FormEvent, schemaData: any) => void;
}

export default function NewSchemaForm({
    setShowNewSchemaForm,
    handleInputChange,
    formData,
    handleSubmit
}: NewSchemaFormProps) {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [colorSchemeIndex, setColorSchemeIndex] = useState<number>(0);
    const [advancedOptions, setAdvancedOptions] = useState<string[]>([]);
    const [configLabels, setConfigLabels] = useState<ConfigLabels>({});
    const [schemaLabels, setSchemaLabels] = useState<string[]>([]);
    const [currentLabelInput, setCurrentLabelInput] = useState<string>('');
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [draggedOptionIndex, setDraggedOptionIndex] = useState<number | null>(null);
    const [draggedConfigIndex, setDraggedConfigIndex] = useState<{ option: string, index: number } | null>(null);
    const [showSavedProgressModal, setShowSavedProgressModal] = useState<boolean>(false);
    const [savedProgresses, setSavedProgresses] = useState<ProgressData[]>([]);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [confirmModal, setConfirmModal] = useState<ConfirmModal>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
        type: 'info'
    });

    // Variant Styles (mapeados desde ListSchema)
    const variantStyles = {
        purple: {
            card: "bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500",
            text: "text-white",
            subtext: "text-purple-100",
            accentGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
            border: "border-purple-200/50"
        },
        indigo: {
            card: "bg-gradient-to-br from-indigo-500 via-blue-600 to-sky-500",
            text: "text-white",
            subtext: "text-blue-100",
            accentGradient: "from-indigo-500 via-blue-600 to-sky-500",
            border: "border-indigo-200/50"
        },
        coral: {
            card: "bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500",
            text: "text-white",
            subtext: "text-orange-100",
            accentGradient: "from-orange-400 via-rose-400 to-pink-500",
            border: "border-rose-200/50"
        },
        emerald: {
            card: "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500",
            text: "text-white",
            subtext: "text-emerald-100",
            accentGradient: "from-emerald-400 via-green-500 to-teal-500",
            border: "border-emerald-200/50"
        },
        amber: {
            card: "bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400",
            text: "text-slate-800",
            subtext: "text-amber-800",
            accentGradient: "from-amber-300 via-yellow-400 to-orange-400",
            border: "border-amber-200/50"
        },
        rose: {
            card: "bg-gradient-to-br from-rose-400 via-pink-500 to-red-500",
            text: "text-white",
            subtext: "text-rose-100",
            accentGradient: "from-rose-400 via-pink-500 to-red-500",
            border: "border-rose-200/50"
        },
        cyan: {
            card: "bg-gradient-to-br from-cyan-300 via-teal-400 to-emerald-400",
            text: "text-slate-800",
            subtext: "text-slate-700",
            accentGradient: "from-cyan-300 via-teal-400 to-emerald-400",
            border: "border-cyan-200/50"
        },
        slate: {
            card: "bg-gradient-to-br from-slate-600 via-slate-700 to-zinc-800",
            text: "text-white",
            subtext: "text-slate-300",
            accentGradient: "from-slate-600 via-slate-700 to-zinc-800",
            border: "border-slate-200/50"
        },
        lime: {
            card: "bg-gradient-to-br from-lime-300 via-lime-400 to-yellow-300",
            text: "text-slate-800",
            subtext: "text-slate-700",
            accentGradient: "from-lime-300 via-lime-400 to-yellow-300",
            border: "border-lime-200/50"
        }
    };

    // Color schemes basados en variantStyles
    const colorSchemes = {
        purple: {
            name: 'purple',
            gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
            cardGradient: 'from-violet-500/10 via-purple-500/10 to-fuchsia-500/10',
            accentGradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-600',
            textAccent: 'text-purple-600',
            border: 'border-purple-200/50',
            hover: 'hover:border-purple-300',
            shadow: 'shadow-purple-100/50',
            bgMain: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500',
            bgButtonSecondary: 'bg-white/50'
        },
        indigo: {
            name: 'indigo',
            gradient: 'from-indigo-500 via-blue-600 to-sky-500',
            cardGradient: 'from-indigo-500/10 via-blue-600/10 to-sky-500/10',
            accentGradient: 'from-indigo-500 via-blue-600 to-sky-500',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-600',
            textAccent: 'text-indigo-600',
            border: 'border-indigo-200/50',
            hover: 'hover:border-indigo-300',
            shadow: 'shadow-indigo-100/50',
            bgMain: 'bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-indigo-500 via-blue-600 to-sky-500',
            bgButtonSecondary: 'bg-white/50'
        },
        coral: {
            name: 'coral',
            gradient: 'from-orange-400 via-rose-400 to-pink-500',
            cardGradient: 'from-orange-400/10 via-rose-400/10 to-pink-500/10',
            accentGradient: 'from-orange-400 via-rose-400 to-pink-500',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-600',
            textAccent: 'text-rose-600',
            border: 'border-rose-200/50',
            hover: 'hover:border-rose-300',
            shadow: 'shadow-rose-100/50',
            bgMain: 'bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500',
            bgButtonSecondary: 'bg-white/50'
        },
        emerald: {
            name: 'emerald',
            gradient: 'from-emerald-400 via-green-500 to-teal-500',
            cardGradient: 'from-emerald-400/10 via-green-500/10 to-teal-500/10',
            accentGradient: 'from-emerald-400 via-green-500 to-teal-500',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-600',
            textAccent: 'text-emerald-600',
            border: 'border-emerald-200/50',
            hover: 'hover:border-emerald-300',
            shadow: 'shadow-emerald-100/50',
            bgMain: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500',
            bgButtonSecondary: 'bg-white/50'
        },
        amber: {
            name: 'amber',
            gradient: 'from-amber-300 via-yellow-400 to-orange-400',
            cardGradient: 'from-amber-300/10 via-yellow-400/10 to-orange-400/10',
            accentGradient: 'from-amber-300 via-yellow-400 to-orange-400',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-amber-800',
            textAccent: 'text-amber-600',
            border: 'border-amber-200/50',
            hover: 'hover:border-amber-300',
            shadow: 'shadow-amber-100/50',
            bgMain: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400',
            bgButtonSecondary: 'bg-white/50'
        },
        rose: {
            name: 'rose',
            gradient: 'from-rose-400 via-pink-500 to-red-500',
            cardGradient: 'from-rose-400/10 via-pink-500/10 to-red-500/10',
            accentGradient: 'from-rose-400 via-pink-500 to-red-500',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-600',
            textAccent: 'text-rose-600',
            border: 'border-rose-200/50',
            hover: 'hover:border-rose-300',
            shadow: 'shadow-rose-100/50',
            bgMain: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-rose-400 via-pink-500 to-red-500',
            bgButtonSecondary: 'bg-white/50'
        },
        cyan: {
            name: 'cyan',
            gradient: 'from-cyan-300 via-teal-400 to-emerald-400',
            cardGradient: 'from-cyan-300/10 via-teal-400/10 to-emerald-400/10',
            accentGradient: 'from-cyan-300 via-teal-400 to-emerald-400',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-700',
            textAccent: 'text-cyan-600',
            border: 'border-cyan-200/50',
            hover: 'hover:border-cyan-300',
            shadow: 'shadow-cyan-100/50',
            bgMain: 'bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400',
            bgButtonSecondary: 'bg-white/50'
        },
        slate: {
            name: 'slate',
            gradient: 'from-slate-600 via-slate-700 to-zinc-800',
            cardGradient: 'from-slate-600/10 via-slate-700/10 to-zinc-800/10',
            accentGradient: 'from-slate-600 via-slate-700 to-zinc-800',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-600',
            textAccent: 'text-slate-700',
            border: 'border-slate-200/50',
            hover: 'hover:border-slate-300',
            shadow: 'shadow-slate-100/50',
            bgMain: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-slate-600 via-slate-700 to-zinc-800',
            bgButtonSecondary: 'bg-white/50'
        },
        lime: {
            name: 'lime',
            gradient: 'from-lime-300 via-lime-400 to-yellow-300',
            cardGradient: 'from-lime-300/10 via-lime-400/10 to-yellow-300/10',
            accentGradient: 'from-lime-300 via-lime-400 to-yellow-300',
            textPrimary: 'text-slate-800',
            textSecondary: 'text-slate-700',
            textAccent: 'text-lime-600',
            border: 'border-lime-200/50',
            hover: 'hover:border-lime-300',
            shadow: 'shadow-lime-100/50',
            bgMain: 'bg-gradient-to-br from-lime-50 via-yellow-50 to-green-50',
            bgCard: 'bg-white/80',
            bgInput: 'bg-white/70',
            bgButton: 'bg-gradient-to-r from-lime-300 via-lime-400 to-yellow-300',
            bgButtonSecondary: 'bg-white/50'
        }
    };

    const currentColors: ColorScheme = Object.values(colorSchemes)[colorSchemeIndex];

    const totalSteps: number = 5;

    // Función para mostrar toast
    const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void => {
        const newToast: Toast = {
            id: `toast-${Date.now()}`,
            message,
            type
        };

        setToasts(prev => [...prev, newToast]);

        // Auto-remover después de 3 segundos
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, 3000);
    };

    // Función para mostrar modal de confirmación
    const showConfirm = (
        title: string,
        message: string,
        onConfirm: () => void,
        type: 'warning' | 'danger' | 'info' | 'success' = 'info',
        showCancelButton: boolean = true
    ): void => {
        setConfirmModal({
            isOpen: true,
            title,
            message,
            onConfirm: () => {
                onConfirm();
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            },
            onCancel: () => {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            },
            type,
            showCancelButton
        });
    };

    // Función para enviar datos a la base de datos
    const saveSchemaToDatabase = async (schemaData: {
        schemaName: string;
        advancedOptions: string[];
        configLabels: ConfigLabels;
        schemaLabels: string[];
    }): Promise<void> => {
        try {

            // Preparar los datos en el formato adecuado para la base de datos
            const dataToSend: ProccesSchema = {
                name: schemaData.schemaName,
                status: "active",
                competencies: schemaData.advancedOptions.map((competency, index) => ({
                    id: `comp_${index + 1}`,
                    name: competency,
                    order: index + 1,
                    questions: (schemaData.configLabels[competency] || []).map((question, qIndex) => ({
                        id: `comp_${index + 1}_q_${qIndex + 1}`,
                        text: question,
                        order: qIndex + 1
                    }))
                })),
                likertScale: schemaData.schemaLabels.map((option, index) => ({
                    id: `scale_${index + 1}`,
                    value: index + 1,
                    label: option,
                    order: index + 1
                })),
                metadata: {
                    totalCompetencies: schemaData.advancedOptions.length,
                    totalQuestions: Object.values(schemaData.configLabels).flat().length,
                    totalScaleOptions: schemaData.schemaLabels.length,
                    colorScheme: colorSchemes[Object.keys(colorSchemes)[colorSchemeIndex] as keyof typeof colorSchemes].name,
                    createdAt: new Date().toISOString()
                }
            };

            // Realizar la petición a la API/base de datos
            const { message }: {
                message: {
                    status: boolean,
                    data: any
                }
            } = await (await fetch('/server/schema', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            })).json()

            if (message.status && message.data == "userFind") {
                // Mostrar modal de error
                showConfirm(
                    'Error al Crear Schema',
                    `No se pudo crear el schema "${schemaData.schemaName}".  Debido a que el Nombre del Proceso Ya Existe. Por favor, intenta nuevamente.`,
                    () => {
                        // Solo cerrar el modal de error
                        setConfirmModal(prev => ({ ...prev, isOpen: false }));
                    },
                    'danger'
                );
            }

            if (message.status && message.data == "create") {
                // Mostrar modal de éxito
                handleSaveProgress()
                showConfirm(
                    '✓ Schema Creado Exitosamente',
                    `El schema "${schemaData.schemaName}" ha sido creado exitosamente con ${dataToSend.metadata.totalCompetencies} competencias, ${dataToSend.metadata.totalQuestions} preguntas y ${dataToSend.metadata.totalScaleOptions} opciones de escala.`,
                    () => {
                        // Cerrar el modal y salir del componente
                        setShowNewSchemaForm(false);
                    },
                    'success',
                    false  // No mostrar botón cancelar
                );

                // Auto-cerrar después de 3 segundos
                setTimeout(() => {
                    setShowNewSchemaForm(false);
                }, 2000);
            }




            // if (!response.ok) {
            //     const errorData = await response.json().catch(() => ({}));
            //     throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            // }

            // const result = await response.json();


            // Log del resultado
            // console.log('Schema guardado exitosamente:', result);

        } catch (error) {

            // Mostrar modal de error
            showConfirm(
                'Error al Crear Schema',
                `No se pudo crear el schema "${schemaData.schemaName}". ${error instanceof Error ? error.message : 'Error desconocido'}. Por favor, intenta nuevamente.`,
                () => {
                    // Solo cerrar el modal de error
                    setConfirmModal(prev => ({ ...prev, isOpen: false }));
                },
                'danger'
            );

            throw error;
        }
    };

    const handleNextStep = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (currentStep === 1 && !formData.schemaName?.trim()) {
            return;
        }

        if (currentStep === 2) {
            if (advancedOptions.length < 3) {
                return;
            }
            // Validar que no haya competencias duplicadas
            const uniqueOptions = new Set(advancedOptions.map(opt => opt.trim().toLowerCase()));
            if (uniqueOptions.size !== advancedOptions.length) {
                return;
            }
        }

        if (currentStep === 3) {
            const hasEmptyConfig = advancedOptions.some(option =>
                !configLabels[option] || configLabels[option].length === 0
            );
            if (hasEmptyConfig) {
                return;
            }
        }

        if (currentStep === 4) {
            if (schemaLabels.length < 5 || schemaLabels.length > 10) {
                return;
            }
            // Validar que no haya escalas duplicadas
            const uniqueLabels = new Set(schemaLabels.map(label => label.trim().toLowerCase()));
            if (uniqueLabels.size !== schemaLabels.length) {
                return;
            }
        }

        if (currentStep === 5) {
            showConfirm(
                'Crear Schema',
                `¿Estás seguro de crear el schema "${formData.schemaName}"? Se creará con ${advancedOptions.length} competencias, ${Object.values(configLabels).flat().length} preguntas y ${schemaLabels.length} opciones de escala.`,
                async () => {
                    const schemaData = {
                        schemaName: formData.schemaName,
                        advancedOptions,
                        configLabels,
                        schemaLabels
                    };

                    try {
                        // Guardar en la base de datos
                        await saveSchemaToDatabase(schemaData);
                        // Llamar al handleSubmit original (si es necesario para otras acciones)
                        // handleSubmit(e, schemaData);
                    } catch (error) {
                        // El error ya fue manejado en saveSchemaToDatabase
                        // console.error('Error en la creación del schema:', error);
                    }
                },
                'info'
            );
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handlers para opciones avanzadas
    const handleAddAdvancedOption = (): void => {
        const newOption = `Competencia ${advancedOptions.length + 1}`;
        setAdvancedOptions([...advancedOptions, newOption]);
        setConfigLabels({ ...configLabels, [newOption]: [] });
    };

    const handleAdvancedOptionChange = (index: number, value: string): void => {
        const oldOption = advancedOptions[index];
        const newOptions = [...advancedOptions];
        newOptions[index] = value;
        setAdvancedOptions(newOptions);

        const newConfigLabels = { ...configLabels };
        if (oldOption !== value && configLabels[oldOption]) {
            newConfigLabels[value] = configLabels[oldOption];
            delete newConfigLabels[oldOption];
            setConfigLabels(newConfigLabels);
        }
    };

    const handleRemoveAdvancedOption = (index: number): void => {
        const optionToRemove = advancedOptions[index];
        setAdvancedOptions(advancedOptions.filter((_, i) => i !== index));
        const newConfigLabels = { ...configLabels };
        delete newConfigLabels[optionToRemove];
        setConfigLabels(newConfigLabels);
    };

    const handleDragStartOption = (index: number): void => {
        setDraggedOptionIndex(index);
    };

    const handleDragOverOption = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
        e.preventDefault();
        if (draggedOptionIndex === null || draggedOptionIndex === index) return;

        const newOptions = [...advancedOptions];
        const draggedItem = newOptions[draggedOptionIndex];
        newOptions.splice(draggedOptionIndex, 1);
        newOptions.splice(index, 0, draggedItem);

        setAdvancedOptions(newOptions);
        setDraggedOptionIndex(index);
    };

    const handleDragEndOption = (): void => {
        setDraggedOptionIndex(null);
    };

    // Handlers para configuración de labels
    const handleAddConfigLabel = (option: string, value: string): void => {
        if (value.trim()) {
            const currentLabels = configLabels[option] || [];
            setConfigLabels({
                ...configLabels,
                [option]: [...currentLabels, value.trim()]
            });
        }
    };

    const handleRemoveConfigLabel = (option: string, labelIndex: number): void => {
        const currentLabels = configLabels[option] || [];
        setConfigLabels({
            ...configLabels,
            [option]: currentLabels.filter((_, i) => i !== labelIndex)
        });
    };

    const handleDragStartConfig = (option: string, index: number): void => {
        setDraggedConfigIndex({ option, index });
    };

    const handleDragOverConfig = (e: React.DragEvent<HTMLDivElement>, option: string, index: number): void => {
        e.preventDefault();
        if (!draggedConfigIndex || draggedConfigIndex.option !== option || draggedConfigIndex.index === index) return;

        const currentLabels = [...(configLabels[option] || [])];
        const draggedItem = currentLabels[draggedConfigIndex.index];
        currentLabels.splice(draggedConfigIndex.index, 1);
        currentLabels.splice(index, 0, draggedItem);

        setConfigLabels({
            ...configLabels,
            [option]: currentLabels
        });
        setDraggedConfigIndex({ option, index });
    };

    const handleDragEndConfig = (): void => {
        setDraggedConfigIndex(null);
    };

    // Handlers para schema labels (Likert)
    const handleAddSchemaLabel = (): void => {
        if (currentLabelInput.trim() && schemaLabels.length < 10) {
            setSchemaLabels([...schemaLabels, currentLabelInput.trim()]);
            setCurrentLabelInput('');
        }
    };

    const handleRemoveSchemaLabel = (index: number): void => {
        setSchemaLabels(schemaLabels.filter((_, i) => i !== index));
    };

    const handleDragStart = (index: number): void => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newLabels = [...schemaLabels];
        const draggedItem = newLabels[draggedIndex];
        newLabels.splice(draggedIndex, 1);
        newLabels.splice(index, 0, draggedItem);

        setSchemaLabels(newLabels);
        setDraggedIndex(index);
    };

    const handleDragEnd = (): void => {
        setDraggedIndex(null);
    };

    // Función para guardar progreso
    const handleSaveProgress = (): void => {
        // Validar que haya un nombre de schema
        if (!formData.schemaName || !formData.schemaName.trim()) {
            showToast('Debes ingresar un nombre para el schema antes de guardar', 'warning');
            return;
        }

        try {
            // Obtener progresos existentes
            const existingProgresses = localStorage.getItem('schema-form-progresses');
            const progresses: ProgressData[] = existingProgresses ? JSON.parse(existingProgresses) : [];

            // Verificar si existe un schema con el mismo nombre
            const existingProgressIndex = progresses.findIndex(
                progress => progress.formData.schemaName.trim().toLowerCase() === formData.schemaName.trim().toLowerCase()
            );

            if (existingProgressIndex !== -1) {
                // Si existe, preguntar si desea sobrescribir
                const existingProgress = progresses[existingProgressIndex];
                showConfirm(
                    'Schema Existente',
                    `Ya existe un schema con el nombre "${formData.schemaName}". ¿Deseas sobrescribirlo? Esta acción reemplazará el schema guardado anteriormente.`,
                    () => {
                        // Sobrescribir el schema existente
                        const progressData: ProgressData = {
                            id: existingProgress.id, // Mantener el mismo ID
                            currentStep,
                            formData,
                            advancedOptions,
                            configLabels,
                            schemaLabels,
                            colorSchemeIndex,
                            savedAt: new Date().toISOString()
                        };

                        progresses[existingProgressIndex] = progressData;
                        localStorage.setItem('schema-form-progresses', JSON.stringify(progresses));
                        showToast('Schema sobrescrito exitosamente', 'success');
                    },
                    'warning'
                );
            } else {
                // Si no existe, guardar nuevo progreso
                const progressData: ProgressData = {
                    id: `progress-${Date.now()}`,
                    currentStep,
                    formData,
                    advancedOptions,
                    configLabels,
                    schemaLabels,
                    colorSchemeIndex,
                    savedAt: new Date().toISOString()
                };

                progresses.push(progressData);
                localStorage.setItem('schema-form-progresses', JSON.stringify(progresses));
                showToast('Progreso guardado exitosamente', 'success');
            }
        } catch (error) {
            // console.error('Error al guardar:', error);
            showToast('Error al guardar el progreso', 'error');
        }
    };

    // Función para cargar progreso guardado
    const handleLoadProgress = (): void => {
        try {
            const savedData = localStorage.getItem('schema-form-progresses');

            if (savedData) {
                const progresses: ProgressData[] = JSON.parse(savedData);

                if (progresses.length > 0) {
                    setSavedProgresses(progresses);
                    setShowSavedProgressModal(true);
                } else {
                    showToast('No hay progresos guardados', 'warning');
                }
            } else {
                showToast('No hay progresos guardados', 'warning');
            }
        } catch (error) {
            // console.error('Error al cargar:', error);
            showToast('Error al cargar los progresos guardados', 'error');
        }
    };

    // Función para seleccionar un progreso específico
    const handleSelectProgress = (progress: ProgressData): void => {
        showConfirm(
            'Cargar Progreso',
            `¿Deseas cargar el progreso "${progress.formData.schemaName || 'Sin nombre'}" del ${new Date(progress.savedAt).toLocaleString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}?`,
            () => {
                setCurrentStep(progress.currentStep);
                handleInputChange({ target: { name: 'schemaName', value: progress.formData.schemaName } } as React.ChangeEvent<HTMLInputElement>);
                setAdvancedOptions(progress.advancedOptions);
                setConfigLabels(progress.configLabels);
                setSchemaLabels(progress.schemaLabels);
                setColorSchemeIndex(progress.colorSchemeIndex);
                setShowSavedProgressModal(false);
                showToast('Progreso cargado exitosamente', 'success');
            },
            'info'
        );
    };

    // Función para eliminar un progreso
    const handleDeleteProgress = (progressId: string): void => {
        showConfirm(
            'Eliminar Progreso',
            '¿Estás seguro de eliminar este progreso guardado? Esta acción no se puede deshacer.',
            () => {
                try {
                    const savedData = localStorage.getItem('schema-form-progresses');
                    if (savedData) {
                        const progresses: ProgressData[] = JSON.parse(savedData);
                        const filteredProgresses = progresses.filter(p => p.id !== progressId);
                        localStorage.setItem('schema-form-progresses', JSON.stringify(filteredProgresses));
                        setSavedProgresses(filteredProgresses);

                        if (filteredProgresses.length === 0) {
                            setShowSavedProgressModal(false);
                        }

                        showToast('Progreso eliminado exitosamente', 'success');
                    }
                } catch (error) {
                    // console.error('Error al eliminar:', error);
                    showToast('Error al eliminar el progreso', 'error');
                }
            },
            'danger'
        );
    };

    // Función para iniciar un nuevo schema desde cero
    const handleNewSchema = (): void => {
        showConfirm(
            'Nuevo Schema',
            '¿Estás seguro de iniciar un nuevo schema? Se perderán los datos actuales si no los has guardado.',
            () => {
                setCurrentStep(1);
                handleInputChange({ target: { name: 'schemaName', value: '' } } as React.ChangeEvent<HTMLInputElement>);
                setAdvancedOptions([]);
                setConfigLabels({});
                setSchemaLabels([]);
                setCurrentLabelInput('');
                setColorSchemeIndex(0);
                showToast('Formulario reiniciado. ¡Puedes comenzar un nuevo schema!', 'success');
            },
            'warning'
        );
    };

    return (
        <>
            <div className={`pt-4 transition-all duration-500`}>
                <div className="max-w-6xl mx-auto">
                    {/* Header con glassmorphism */}
                    <div className={`backdrop-blur-xl rounded-2xl shadow-xl ${currentColors.shadow} border ${currentColors.border} p-6 sm:p-8 mb-6 bg-white `}>
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => setShowNewSchemaForm(false)}
                                className={`flex items-center gap-2 px-4 py-2 border ${currentColors.border} ${currentColors.textPrimary} rounded-lg font-medium hover:bg-white/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-x-1 ${currentColors.bgButton} text-white`}
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Volver</span>
                            </button>

                            {/* Color Palette Selector */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-x-visible scrollbar-hide max-w-[88px] sm:max-w-none">
                                    {Object.values(colorSchemes).map((scheme, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setColorSchemeIndex(index)}
                                            className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${scheme.accentGradient} transition-all duration-300 cursor-pointer transform hover:scale-125 hover:rotate-12 flex-shrink-0 ${colorSchemeIndex === index
                                                ? 'ring-2 ring-offset-2 ring-slate-400 scale-110'
                                                : 'opacity-50 hover:opacity-100'
                                                }`}
                                            title={scheme.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Estilos para ocultar la barra de scroll */}
                            <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                            .scrollbar-hide {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}</style>
                        </div>

                        <h1 className={`text-3xl sm:text-4xl font-bold ${currentColors.textPrimary} mb-2`}>
                            {currentStep > 1 && formData.schemaName ? formData.schemaName : 'Crear Nuevo Schema'}
                        </h1>
                        <p className={`${currentColors.textSecondary}`}>
                            Paso {currentStep} de {totalSteps}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-6 w-full bg-white/50 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className={`h-full ${currentColors.bgButton} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    {/* Form Container */}
                    <form onSubmit={handleNextStep}>
                        <div className={`${currentColors.bgCard} backdrop-blur-xl rounded-2xl shadow-xl ${currentColors.shadow} border ${currentColors.border} p-6 sm:p-8`}>
                            <AnimatePresence mode="wait">
                                {/* Step 1: Nombre del Schema */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className={`text-2xl font-bold ${currentColors.textPrimary} mb-2`}>
                                            Nombre del Schema
                                        </h2>
                                        <p className={`${currentColors.textSecondary} mb-6`}>
                                            Elige un nombre descriptivo para tu schema
                                        </p>

                                        <div>
                                            <label className={`block ${currentColors.textPrimary} font-medium mb-3`}>
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                name="schemaName"
                                                value={formData.schemaName || ''}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border ${currentColors.border} ${currentColors.hover} rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${currentColors.textPrimary}`}
                                                placeholder="Ej: Evaluación de Satisfacción"
                                                autoFocus
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Competencias */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className={`text-2xl font-bold ${currentColors.textPrimary} mb-2`}>
                                            {formData.schemaName || 'Competencias del Schema'}
                                        </h2>
                                        <p className={`${currentColors.textSecondary} mb-6`}>
                                            Agrega al menos 3 competencias para organizar tu evaluación
                                        </p>

                                        <div className="space-y-4">
                                            {advancedOptions.map((option, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    draggable
                                                    onDragStart={() => handleDragStartOption(index)}
                                                    onDragOver={(e) => handleDragOverOption(e, index)}
                                                    onDragEnd={handleDragEndOption}
                                                    className={`flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm border ${currentColors.border} rounded-xl ${currentColors.hover} transition-all cursor-move`}
                                                >
                                                    <GripVertical className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => handleAdvancedOptionChange(index, e.target.value)}
                                                        className={`flex-1 bg-transparent border-none focus:outline-none ${currentColors.textPrimary} font-medium`}
                                                        placeholder={`Competencia ${index + 1}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveAdvancedOption(index)}
                                                        className="text-red-500 hover:text-red-700 transition-all duration-300 flex-shrink-0 cursor-pointer hover:scale-125 hover:rotate-90"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </motion.div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={handleAddAdvancedOption}
                                                className={`w-full py-3 border-2 border-dashed ${currentColors.border} ${currentColors.hover} rounded-xl ${currentColors.textAccent} font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/30 cursor-pointer hover:scale-105 hover:shadow-md`}
                                            >
                                                <Plus className="w-5 h-5" />
                                                Agregar Competencia
                                            </button>

                                            {advancedOptions.length < 3 && (
                                                <p className="text-amber-600 text-sm flex items-center gap-2 mt-2">
                                                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                                    Se requieren al menos 3 competencias
                                                </p>
                                            )}

                                            {(() => {
                                                const uniqueOptions = new Set(advancedOptions.map(opt => opt.trim().toLowerCase()));
                                                return uniqueOptions.size !== advancedOptions.length && (
                                                    <p className="text-red-600 text-sm flex items-center gap-2 mt-2">
                                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                                        No puede haber competencias con el mismo nombre
                                                    </p>
                                                );
                                            })()}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Preguntas */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className={`text-2xl font-bold ${currentColors.textPrimary} mb-2`}>
                                            {formData.schemaName || 'Preguntas'}
                                        </h2>
                                        <p className={`${currentColors.textSecondary} mb-6`}>
                                            Agrega preguntas para cada competencia
                                        </p>

                                        <div className="space-y-6">
                                            {advancedOptions.map((option, optionIndex) => (
                                                <div key={optionIndex} className={`p-5 bg-white/60 backdrop-blur-sm border ${currentColors.border} rounded-xl`}>
                                                    <h3 className={`font-semibold ${currentColors.textAccent} mb-4 text-lg`}>
                                                        {option}
                                                    </h3>

                                                    <div className="flex gap-2 mb-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Nueva pregunta..."
                                                            className={`flex-1 px-4 py-2.5 bg-white/70 backdrop-blur-sm border ${currentColors.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${currentColors.textPrimary}`}
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleAddConfigLabel(option, e.currentTarget.value);
                                                                    e.currentTarget.value = '';
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                                handleAddConfigLabel(option, input.value);
                                                                input.value = '';
                                                            }}
                                                            className={`px-4 py-2.5 ${currentColors.bgButton} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110`}
                                                        >
                                                            <Plus className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    <div className="space-y-2">
                                                        {(configLabels[option] || []).map((label, labelIndex) => (
                                                            <motion.div
                                                                key={labelIndex}
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                draggable
                                                                onDragStart={() => handleDragStartConfig(option, labelIndex)}
                                                                onDragOver={(e) => handleDragOverConfig(e, option, labelIndex)}
                                                                onDragEnd={handleDragEndConfig}
                                                                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 hover:border-slate-300 transition-all cursor-move group"
                                                            >
                                                                <GripVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                <span className={`flex-1 ${currentColors.textPrimary}`}>{label}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveConfigLabel(option, labelIndex)}
                                                                    className="text-red-500 hover:text-red-700 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-125 hover:rotate-90"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {(!configLabels[option] || configLabels[option].length === 0) && (
                                                        <p className="text-amber-600 text-sm flex items-center gap-2 mt-2">
                                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                                            Esta competencia necesita al menos una pregunta
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Escala Likert */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className={`text-2xl font-bold ${currentColors.textPrimary} mb-2`}>
                                            {formData.schemaName || 'Escala Likert'}
                                        </h2>
                                        <p className={`${currentColors.textSecondary} mb-6`}>
                                            Define entre 5 y 10 opciones de respuesta (Escala Likert)
                                        </p>

                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={currentLabelInput}
                                                    onChange={(e) => setCurrentLabelInput(e.target.value)}
                                                    placeholder="Nueva opción..."
                                                    className={`flex-1 px-4 py-3 bg-white/70 backdrop-blur-sm border ${currentColors.border} rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${currentColors.textPrimary}`}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddSchemaLabel();
                                                        }
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddSchemaLabel}
                                                    disabled={schemaLabels.length >= 10}
                                                    className={`px-6 py-3 ${currentColors.bgButton} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-110`}
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {schemaLabels.map((label, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        draggable
                                                        onDragStart={() => handleDragStart(index)}
                                                        onDragOver={(e) => handleDragOver(e, index)}
                                                        onDragEnd={handleDragEnd}
                                                        className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-move group"
                                                    >
                                                        <GripVertical className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <span className={`flex-1 font-medium ${currentColors.textPrimary}`}>{label}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSchemaLabel(index)}
                                                            className="text-red-500 hover:text-red-700 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-125 hover:rotate-90"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className={currentColors.textSecondary}>
                                                    {schemaLabels.length} de 10 opciones
                                                </span>
                                                {(schemaLabels.length < 5 || schemaLabels.length > 10) && (
                                                    <p className="text-amber-600 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                                        Se requieren entre 5 y 10 opciones
                                                    </p>
                                                )}
                                            </div>

                                            {(() => {
                                                const uniqueLabels = new Set(schemaLabels.map(label => label.trim().toLowerCase()));
                                                return uniqueLabels.size !== schemaLabels.length && (
                                                    <p className="text-red-600 text-sm flex items-center gap-2 mt-2">
                                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                                        No puede haber opciones con el mismo nombre
                                                    </p>
                                                );
                                            })()}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 5: Revisión */}
                                {currentStep === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className={`text-2xl font-bold ${currentColors.textPrimary} mb-2`}>
                                            {formData.schemaName || 'Revisión Final'}
                                        </h2>
                                        <p className={`${currentColors.textSecondary} mb-6`}>
                                            Verifica que toda la información sea correcta
                                        </p>

                                        <div className="space-y-4">
                                            {/* Nombre del Schema */}
                                            <div className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200">
                                                <span className={`text-sm font-medium ${currentColors.textSecondary}`}>Nombre del Schema</span>
                                                <p className={`text-xl font-bold ${currentColors.textPrimary} mt-1`}>{formData.schemaName}</p>
                                            </div>

                                            {/* Competencias y Preguntas */}
                                            <div className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200">
                                                <span className={`text-sm font-medium ${currentColors.textSecondary} mb-3 block`}>Competencias y Preguntas</span>
                                                <div className="space-y-3">
                                                    {advancedOptions.map((option, index) => (
                                                        <div key={index} className="pl-4 border-l-2 border-slate-300">
                                                            <p className={`font-semibold ${currentColors.textAccent} mb-1`}>{option}</p>
                                                            <p className={`text-sm ${currentColors.textSecondary}`}>
                                                                {configLabels[option]?.length || 0} {configLabels[option]?.length === 1 ? 'pregunta' : 'preguntas'}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Escala Likert */}
                                            <div className="p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200">
                                                <span className={`text-sm font-medium ${currentColors.textSecondary} mb-3 block`}>Escala de Respuestas</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {schemaLabels.map((label, index) => (
                                                        <span
                                                            key={index}
                                                            className={`px-3 py-1.5 bg-gradient-to-r ${currentColors.accentGradient} text-white rounded-lg text-sm font-medium`}
                                                        >
                                                            {label}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className={`text-sm ${currentColors.textSecondary} mt-2`}>
                                                    {schemaLabels.length} opciones configuradas
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 mt-8">
                                {/* Botones de navegación */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            className={`px-6 py-3 border-2 ${currentColors.border} ${currentColors.textPrimary} rounded-xl font-medium hover:bg-white/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-x-1`}
                                        >
                                            ← Atrás
                                        </button>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={
                                            (currentStep === 1 && !formData.schemaName?.trim()) ||
                                            (currentStep === 2 && (advancedOptions.length < 3 || new Set(advancedOptions.map(opt => opt.trim().toLowerCase())).size !== advancedOptions.length)) ||
                                            (currentStep === 3 && advancedOptions.some(option => !configLabels[option] || configLabels[option].length === 0)) ||
                                            (currentStep === 4 && (schemaLabels.length < 5 || schemaLabels.length > 10 || new Set(schemaLabels.map(label => label.trim().toLowerCase())).size !== schemaLabels.length))
                                        }
                                        className={`px-8 py-3 ${currentColors.bgButton} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-105 hover:shadow-2xl ${currentStep === 1 ? 'w-full sm:w-auto sm:ml-auto' : 'w-full sm:w-auto'
                                            }`}
                                    >
                                        {currentStep === 5 ? 'Crear Schema ✓' : 'Continuar →'}
                                    </button>
                                </div>

                                {/* Botones de guardar/cargar progreso */}
                                <div className="flex justify-start gap-2 pt-3 border-t border-slate-200">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={handleSaveProgress}
                                            onMouseEnter={() => setHoveredButton('save')}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className={`px-4 py-3 border ${currentColors.border} ${currentColors.textPrimary} rounded-lg font-medium hover:bg-white/50 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-md`}
                                        >
                                            <Save className="scale-90" />
                                        </button>
                                        {hoveredButton === 'save' && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
                                                Guardar Progreso
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                                    <div className="border-4 border-transparent border-t-slate-800"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={handleLoadProgress}
                                            onMouseEnter={() => setHoveredButton('load')}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className={`px-4 py-3 border ${currentColors.border} ${currentColors.textPrimary} rounded-lg font-medium hover:bg-white/50 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-md`}
                                        >
                                            <BookCopy className="scale-90" />
                                        </button>
                                        {hoveredButton === 'load' && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
                                                Ver Schemas
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                                    <div className="border-4 border-transparent border-t-slate-800"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={handleNewSchema}
                                            onMouseEnter={() => setHoveredButton('new')}
                                            onMouseLeave={() => setHoveredButton(null)}
                                            className={`px-4 py-3 ${currentColors.bgButton} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-xl`}
                                        >
                                            <RefreshCcw className="scale-90" />
                                        </button>
                                        {hoveredButton === 'new' && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
                                                Nuevo Schema
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                                    <div className="border-4 border-transparent border-t-slate-800"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal de Progresos Guardados */}
            {showSavedProgressModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`${currentColors.bgCard} backdrop-blur-xl rounded-2xl shadow-2xl border ${currentColors.border} max-w-3xl w-full max-h-[80vh] overflow-hidden`}
                    >
                        {/* Header del Modal */}
                        <div className={`p-6 border-b ${currentColors.border}`}>
                            <div className="flex items-center justify-between">
                                <h3 className={`text-2xl font-bold ${currentColors.textPrimary}`}>
                                    Progresos Guardados
                                </h3>
                                <button
                                    onClick={() => setShowSavedProgressModal(false)}
                                    className={`p-2 rounded-lg ${currentColors.textSecondary} hover:bg-white/50 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-90`}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <p className={`${currentColors.textSecondary} mt-2`}>
                                Selecciona un progreso para continuar editándolo
                            </p>
                        </div>

                        {/* Lista de Progresos */}
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                            {savedProgresses.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className={`${currentColors.textSecondary} text-lg`}>
                                        No hay progresos guardados
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {savedProgresses.map((progress, index) => (
                                        <motion.div
                                            key={progress.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group relative p-5 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 cursor-pointer" onClick={() => handleSelectProgress(progress)}>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className={`text-lg font-bold ${currentColors.textPrimary}`}>
                                                            {progress.formData.schemaName || 'Sin nombre'}
                                                        </h4>
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-md ${currentColors.bgButton} text-white`}>
                                                            Paso {progress.currentStep}/5
                                                        </span>
                                                    </div>

                                                    <div className={`text-sm ${currentColors.textSecondary} space-y-1`}>
                                                        <p>
                                                            📅 Guardado: {new Date(progress.savedAt).toLocaleString('es-ES', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                        {progress.advancedOptions.length > 0 && (
                                                            <p>
                                                                📋 {progress.advancedOptions.length} {progress.advancedOptions.length === 1 ? 'competencia' : 'competencias'}
                                                            </p>
                                                        )}
                                                        {progress.schemaLabels.length > 0 && (
                                                            <p>
                                                                ⭐ {progress.schemaLabels.length} opciones de escala
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleDeleteProgress(progress.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-125 hover:rotate-12"
                                                    title="Eliminar progreso"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Modal de Confirmación */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`${currentColors.bgCard} backdrop-blur-xl rounded-2xl shadow-2xl border ${currentColors.border} max-w-md w-full overflow-hidden`}
                    >
                        {/* Header del Modal */}
                        <div className={`p-6 border-b ${currentColors.border}`}>
                            <div className="flex items-center gap-3">
                                {confirmModal.type === 'success' && (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                {confirmModal.type === 'danger' && (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                )}
                                {confirmModal.type === 'warning' && (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                )}
                                {confirmModal.type === 'info' && (
                                    <div className={`w-12 h-12 rounded-full ${currentColors.bgButton} flex items-center justify-center flex-shrink-0`}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className={`text-xl font-bold ${currentColors.textPrimary}`}>
                                        {confirmModal.title}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Contenido del Modal */}
                        <div className="p-6">
                            <p className={`${currentColors.textSecondary} text-base leading-relaxed`}>
                                {confirmModal.message}
                            </p>
                        </div>

                        {/* Footer con botones */}
                        <div className={`p-6 border-t ${currentColors.border} flex gap-3 ${confirmModal.showCancelButton !== false ? 'justify-end' : 'justify-center'}`}>
                            {confirmModal.showCancelButton !== false && (
                                <button
                                    onClick={confirmModal.onCancel}
                                    className={`px-6 py-2.5 border ${currentColors.border} ${currentColors.textPrimary} rounded-lg font-medium hover:bg-white/50 transition-all duration-300 cursor-pointer hover:scale-105`}
                                >
                                    Cancelar
                                </button>
                            )}
                            <button
                                onClick={confirmModal.onConfirm}
                                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg ${confirmModal.type === 'success'
                                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                                    : confirmModal.type === 'danger'
                                        ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white'
                                        : confirmModal.type === 'warning'
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                                            : `${currentColors.bgButton} text-white hover:shadow-lg`
                                    }`}
                            >
                                {confirmModal.type === 'success' ? 'Aceptar' : 'Confirmar'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Toast Notifications */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const toastStyles = {
                            success: `bg-gradient-to-r from-emerald-500 to-green-500 text-white`,
                            error: `bg-gradient-to-r from-red-500 to-rose-500 text-white`,
                            warning: `bg-gradient-to-r from-amber-500 to-orange-500 text-white`,
                            info: `${currentColors.bgButton} text-white`
                        };

                        const toastIcons = {
                            success: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ),
                            error: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ),
                            warning: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            ),
                            info: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )
                        };

                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className={`${toastStyles[toast.type]} rounded-xl shadow-lg backdrop-blur-sm px-4 py-3 flex items-center gap-3 min-w-[300px] max-w-md`}
                            >
                                <div className="flex-shrink-0">
                                    {toastIcons[toast.type]}
                                </div>
                                <p className="flex-1 font-medium text-sm">
                                    {toast.message}
                                </p>
                                <button
                                    onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                                    className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-all duration-300 cursor-pointer hover:scale-125 hover:rotate-90"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </>
    );
};