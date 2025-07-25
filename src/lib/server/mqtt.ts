import mqtt, { type MqttClient } from "mqtt";
import { env } from "$env/dynamic/private";

const {
  MQTT_USERNAME,
  MQTT_PASSWORD,
  MQTT_BROKER_URI = "mqtt://test.mosquitto.org",
  MQTT_TOPIC = "test",
  MQTT_PAYLOAD = "ON",
} = env;

let client: MqttClient;

export function init() {
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
