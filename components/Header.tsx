import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { AlertTriangle, Settings, Gift, UserPlus, Plus, X, List, LayoutGrid } from 'lucide-react';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export default () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Datos de ejemplo para las notificaciones
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Nueva actualización disponible",
            message: "La versión 2.0 está lista para instalar",
            time: "Hace 5 min",
            read: false,
            type: "info" // info, warning, success
        },
        {
            id: 2,
            title: "Mensaje de equipo",
            message: "Te han mencionado en un comentario",
            time: "Hace 1 hora",
            read: false,
            type: "info"
        },
        {
            id: 3,
            title: "Tarea completada",
            message: "El proyecto X se ha finalizado exitosamente",
            time: "Hace 2 horas",
            read: true,
            type: "success"
        },
        {
            id: 4,
            title: "Alerta de sistema",
            message: "Se requiere tu atención en el dashboard",
            time: "Hace 3 horas",
            read: false,
            type: "warning"
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Función para marcar una notificación como leída
    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ));
    };

    // Función para marcar todas como leídas
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    // Función para eliminar una notificación
    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    // Función para obtener el icono según el tipo
    const getNotificationIcon = (type: string) => {
        switch(type) {
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-orange-500" />;
            case 'success':
                return <Gift className="w-5 h-5 text-green-500" />;
            default:
                return <Bell className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <header className="px-5 lg:px-6 animate__animated animate__fadeIn">
            <div className="flex items-center justify-between max-w-1400px mx-auto">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <svg className='w-30 h-20'>
                        <use href="./sprite.svg#wings360"></use>
                    </svg>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-3 relative">
                    <button className="cursor-pointer font-semibold hover:text-theme-text1 text-sm">Help</button>
                    <button 
                        className="cursor-pointer relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    >
                        <Bell className="w-5 h-5 text-theme-text0" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-purple-500 rounded-full text-white text-xs flex items-center justify-center font-semibold px-1">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Panel de Notificaciones */}
                    {isNotificationOpen && (
                        <>
                            {/* Overlay para cerrar al hacer clic fuera */}
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsNotificationOpen(false)}
                            ></div>
                            
                            {/* Panel */}
                            <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 animate__animated animate__fadeIn animate__faster">
                                {/* Header del panel */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">Notificaciones</h3>
                                        {unreadCount > 0 && (
                                            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                                                {unreadCount} nuevas
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {unreadCount > 0 && (
                                            <button 
                                                onClick={markAllAsRead}
                                                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                                            >
                                                Marcar todas
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => setIsNotificationOpen(false)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Lista de notificaciones */}
                                <div className="max-h-[500px] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div 
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group ${
                                                    !notification.read ? 'bg-purple-50' : ''
                                                }`}
                                            >
                                                <div className="flex gap-3">
                                                    {/* Icono según tipo */}
                                                    <div className="flex-shrink-0 mt-1">
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    
                                                    {/* Contenido */}
                                                    <div 
                                                        className="flex-1 min-w-0 cursor-pointer"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                                                                {notification.title}
                                                                {!notification.read && (
                                                                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                                                                )}
                                                            </h4>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteNotification(notification.id);
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                                                            >
                                                                <X className="w-4 h-4 text-gray-500" />
                                                            </button>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <span className="text-xs text-gray-500">{notification.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-500">
                                            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="font-medium">No tienes notificaciones</p>
                                            <p className="text-xs mt-1">Cuando recibas notificaciones aparecerán aquí</p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer del panel */}
                                {notifications.length > 0 && (
                                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                                        <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium py-2 hover:bg-purple-50 rounded transition-colors">
                                            Ver todas las notificaciones →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    
                    <button className="p-2">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </button>
                </div>
            </div>
        </header>
    )
}