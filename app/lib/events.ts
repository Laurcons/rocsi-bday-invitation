import { supabase } from "./supabase";
import { PresenceStatus } from "~/lib/types";
import type { EventData } from "~/lib/types";

export async function sendEvent(
  invitationCode: string,
  eventName: string,
  eventData: EventData
) {
  try {
    const { data, error } = await supabase.rpc("insert_event", {
      _invitation_code: invitationCode,
      _event_name: eventName,
      _event_data: eventData,
    });

    if (error) {
      console.error("Error sending event:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error sending event:", err);
    return false;
  }
}

export async function sendPageOpenEvent(invitationCode: string) {
  const eventData: EventData = {
    date: new Date().toISOString(),
  };

  return sendEvent(invitationCode, "Page_Open", eventData);
}

export async function sendPresenceChangedEvent(
  invitationCode: string,
  presenceStatus: PresenceStatus | null
) {
  const eventData: EventData = {
    date: new Date().toISOString(),
    presenceStatus: presenceStatus || undefined,
  };

  return sendEvent(invitationCode, "Presence_Changed", eventData);
}
