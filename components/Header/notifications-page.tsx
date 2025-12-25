'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, X, Check, CheckCheck, Trash2, Filter, ArrowLeft, AlertTriangle, Gift } from 'lucide-react';

// Tipo para las notificaciones
interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    date: string;
    isRead: boolean;
    type?: 'info' | 'warning' | 'success';
}

export default function NotificationsPage() {
    const router = useRouter();
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'Nuevo mensaje',
            message: 'Tienes un nuevo mensaje de María sobre el proyecto de desarrollo',
            time: 'Hace 5 min',
            date: '25 Dic 2024',
            isRead: false,
            type: 'info'
        },
        {
            id: '2',
            title: 'Actualización disponible',
            message: 'Hay una nueva versión disponible del sistema. Te recomendamos actualizar pronto.',
            time: 'Hace 1 hora',
            date: '25 Dic 2024',
            isRead: false,
            type: 'warning'
        },
        {
            id: '3',
            title: 'Tarea completada',
            message: 'Tu proyecto ha sido procesado exitosamente y está listo para revisión',
            time: 'Hace 2 horas',
            date: '25 Dic 2024',
            isRead: true,
            type: 'success'
        },
        {
            id: '4',
            title: 'Recordatorio',
            message: 'Tienes una reunión programada para mañana a las 10:00 AM',
            time: 'Hace 3 horas',
            date: '25 Dic 2024',
            isRead: false,
            type: 'info'
        },
        {
            id: '5',
            title: 'Nuevo comentario',
            message: 'Juan ha comentado en tu publicación',
            time: 'Ayer',
            date: '24 Dic 2024',
            isRead: true,
            type: 'info'
        },
        {
            id: '6',
            title: 'Mantenimiento programado',
            message: 'El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 4:00 AM',
            time: 'Hace 2 días',
            date: '23 Dic 2024',
            isRead: true,
            type: 'warning'
        },
        {
            id: '7',
            title: 'Felicitaciones',
            message: 'Has alcanzado 1000 seguidores. ¡Sigue así!',
            time: 'Hace 3 días',
            date: '22 Dic 2024',
            isRead: true,
            type: 'success'
        },
    ]);

    const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.isRead;
        if (filter === 'read') return n.isRead;
        return true;
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        setSelectedNotifications([]);
    };

    const markSelectedAsRead = () => {
        setNotifications(notifications.map(n => 
            selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n
        ));
        setSelectedNotifications([]);
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
        setSelectedNotifications(selectedNotifications.filter(sid => sid !== id));
    };

    const deleteSelected = () => {
        setNotifications(notifications.filter(n => !selectedNotifications.includes(n.id)));
        setSelectedNotifications([]);
    };

    const toggleSelect = (id: string) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(selectedNotifications.filter(sid => sid !== id));
        } else {
            setSelectedNotifications([...selectedNotifications, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map(n => n.id));
        }
    };

    const getNotificationIcon = (type?: string) => {
        switch (type) {
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'success':
                return <Gift className="w-5 h-5 text-green-500" />;
            default:
                return <Bell className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
                                {unreadCount > 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {unreadCount} sin leer
                                    </p>
                                )}
                            </div>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <CheckCheck className="w-4 h-4" />
                                Marcar todas como leídas
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Filters and Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Filters */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                        filter === 'all'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Todas ({notifications.length})
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                        filter === 'unread'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Sin leer ({unreadCount})
                                </button>
                                <button
                                    onClick={() => setFilter('read')}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                        filter === 'read'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Leídas ({notifications.length - unreadCount})
                                </button>
                            </div>
                        </div>

                        {/* Bulk actions */}
                        {selectedNotifications.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {selectedNotifications.length} seleccionadas
                                </span>
                                <button
                                    onClick={markSelectedAsRead}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Check className="w-4 h-4" />
                                    Marcar como leídas
                                </button>
                                <button
                                    onClick={deleteSelected}
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Select all */}
                    {filteredNotifications.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                                    onChange={toggleSelectAll}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">
                                    Seleccionar todas las notificaciones visibles
                                </span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Notifications List */}
                <div className="space-y-2">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500 text-lg">
                                {filter === 'unread' && 'No tienes notificaciones sin leer'}
                                {filter === 'read' && 'No tienes notificaciones leídas'}
                                {filter === 'all' && 'No tienes notificaciones'}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                                    !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                                }`}
                            >
                                <div className="flex gap-4">
                                    {/* Checkbox */}
                                    <div className="flex-shrink-0 pt-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedNotifications.includes(notification.id)}
                                            onChange={() => toggleSelect(notification.id)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Icon */}
                                    <div className="flex-shrink-0 pt-1">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className={`text-base font-semibold ${
                                                    !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                                                }`}>
                                                    {notification.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-4 mt-3">
                                                    <span className="text-xs text-gray-500">
                                                        {notification.time}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {notification.date}
                                                    </span>
                                                    {!notification.isRead && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                                        >
                                                            Marcar como leída
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Delete button */}
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
