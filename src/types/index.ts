export interface WiFiStatus {
  connected: boolean;
  ssid: string | null;
  ip: string | null;
}

export interface WiFiConnection {
  ssid: string;
  password: string;
}

export interface WiFiNetwork {
  ssid: string;
  signal: number;
} 