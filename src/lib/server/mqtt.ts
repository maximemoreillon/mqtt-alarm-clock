import mqtt, { type MqttClient } from "mqtt";
import { env } from "$env/dynamic/private";

const {
  MQTT_USERNAME,
  MQTT_PASSWORD,
  MQTT_BROKER_URI,
  MQTT_TOPIC = "test",
  MQTT_PAYLOAD = "ON",
} = env;

let client: MqttClient;

export function init() {
  // No default broker: falling back to a public one would leak credentials
  // and alarm messages.
  if (!MQTT_BROKER_URI) throw new Error("MQTT_BROKER_URI is not set");

  console.log(`[MQTT] Connecting to ${MQTT_BROKER_URI}`);
  const options: mqtt.IClientOptions = {
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
  };

  client = mqtt.connect(MQTT_BROKER_URI, options);

  client.on("connect", () => {
    console.log("[MQTT] Connected");
  });
}

export async function publish() {
  console.log("[MQTT] Publishing");
  client.publish(MQTT_TOPIC, MQTT_PAYLOAD);
}
