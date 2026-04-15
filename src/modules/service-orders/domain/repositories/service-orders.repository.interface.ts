import { ServiceOrder, ServiceOrderStatus } from '../entities/service-orders.entity';

export interface ServiceOrderRepository {
    findById(id: string): Promise<ServiceOrder | null>;
    findAll(status?: ServiceOrderStatus): Promise<ServiceOrder[]>;
    create(serviceOrder: ServiceOrder): Promise<ServiceOrder>;
    save(serviceOrder: ServiceOrder): Promise<ServiceOrder>;
    delete(id: string): Promise<void>;
    addService(serviceOrderId: string, serviceId: string, newTotalPrice: number): Promise<void>;
    removeService(serviceOrderId: string, serviceId: string, newTotalPrice: number): Promise<void>;
    addPart(serviceOrderId: string, partId: string, quantity: number, newTotalPrice: number): Promise<void>;
    removePart(serviceOrderId: string, partId: string, newTotalPrice: number): Promise<void>;
    /**
     * Feature 16 — Atomically: validates stock, decrements stockQty for every part,
     * and sets the ServiceOrder status to IN_PROGRESS.
     * Throws InsufficientStockError if any part lacks stock (full rollback).
     */
    reserveStockAndApprove(serviceOrder: ServiceOrder): Promise<ServiceOrder>;
}
