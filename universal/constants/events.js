// Client WebSocket events
export const HANDSHAKE = 'HANDSHAKE';
export const FORWARD_STATE = 'FORWARD_STATE';
export const INITIALIZE_ROOMS = 'INITIALIZE_ROOMS';
export const INITIALIZE_MARKERS = 'INITIALIZE_MARKERS';
export const INITIALIZE_STALLS = 'INITIALIZE_STALLS';
export const RECONNECTED = 'RECONNECTED';
export const ROOM_STATUSES_UPDATE = 'ROOM_STATUSES_UPDATE';
export const STALL_OCCUPANCIES_UPDATE = 'STALL_OCCUPANCIES_UPDATE';
export const NEW_ROOM_PING = 'NEW_ROOM_PING';
export const ROOM_TEMPERATURE_UPDATE = 'ROOM_TEMPERATURE_UPDATE';
export const ROOM_MOTION_UPDATE = 'ROOM_MOTION_UPDATE';
export const TIME_TRAVEL_UPDATE = 'TIME_TRAVEL_UPDATE';

export const UNDEFINED_EVENT = 'UNDEFINED_EVENT';

/**
 * All Particle Photon events are fired using the ROOM_EVENT WebHook integration.
 * Events are handled using a `type` property stringified into the event data.
 */

// Firmware event
export const ROOM_EVENT = 'ROOM_EVENT';

// Firmware event types
export const MOTION_DETECTED = 'MOTION_DETECTED';
export const TEMPERATURE_READINGS = 'TEMPERATURE_READINGS';
