import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../../../lib/supabase";
import { PresenceStatus } from "../../../../lib/types";
import {
  sendPageOpenEvent,
  sendPresenceChangedEvent,
} from "../../../../lib/events";
import blackRibbon from "../../../../assets/black-ribbon.webp";
import discoBall from "../../../../assets/disco-ball.png";
import redStar from "../../../../assets/red-star.png";
import cutoutR from "../../../../assets/cutout/r.png";
import cutoutO from "../../../../assets/cutout/o.png";
import cutoutC from "../../../../assets/cutout/c.png";
import cutoutS from "../../../../assets/cutout/s.png";
import cutoutI from "../../../../assets/cutout/i.png";
import balloon2 from "../../../../assets/balloons/2.png";
import balloon3 from "../../../../assets/balloons/3.png";
import her from "../../../../assets/her.png";
import birthdayHat from "../../../../assets/birthday-hat.png";
import lipstickKiss from "../../../../assets/lipstick-kiss.png";
import hibiscus from "../../../../assets/hibiscus.png";
import redMartini from "../../../../assets/red-martini.png";
import discoCat from "../../../../assets/disco-cat.png";
import xoxo from "../../../../assets/xoxo.png";
import { RcsCheckbox } from "~/lib/ui/checkbox";
import { RcsButton } from "~/lib/ui/button";

export function meta() {
  return [
    { title: "Invitație - Ziua Rocsi" },
    { name: "description", content: "Invitația ta la ziua Rocsi" },
  ];
}

export default function InvitationPage() {
  const { code } = useParams();
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateBtnState, setUpdateBtnState] = useState<
    "loading" | "success" | "error" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const [presenceStatus, setPresenceStatus] = useState<PresenceStatus | null>(
    null
  );

  async function handleUpdatePresence() {
    if (!code || presenceStatus === null) return;

    setUpdateBtnState("loading");

    try {
      // Call the RPC function to set presence status
      const { data: presenceData, error: rpcError } = await supabase.rpc(
        "set_presence_by_invitation_code",
        {
          input_code: code,
          input_presence_status: presenceStatus,
        }
      );

      if (rpcError) {
        console.error("RPC error:", rpcError);
        setUpdateBtnState("error");
        setTimeout(() => {
          setUpdateBtnState(null);
        }, 1000);
        return;
      }

      // Send presence changed event
      await sendPresenceChangedEvent(code, presenceStatus);

      setUpdateBtnState("success");
      setTimeout(() => {
        setUpdateBtnState(null);
      }, 1000);
    } catch (error) {
      console.error("Error updating presence:", error);
      setUpdateBtnState("error");
      setTimeout(() => {
        setUpdateBtnState(null);
      }, 1000);
    }
  }

  useEffect(() => {
    async function handleInvitation() {
      if (!code) {
        setError("Link de invitație invalid");
        setIsLoading(false);
        return;
      }

      try {
        // Call the RPC function to get invitation by code
        const { data: invitationData, error: rpcError } = await supabase.rpc(
          "get_invitation_by_code",
          { input_code: code }
        );

        if (rpcError) {
          console.error("RPC error:", rpcError);
          setError("Cod de invitație invalid");
          setIsLoading(false);
          return;
        }

        if (!invitationData || invitationData.length === 0) {
          setError("Cod de invitație invalid");
          setIsLoading(false);
          return;
        }

        // Get the invitation data from the returned record
        const invitation = invitationData[0];
        setUserNickname(invitation.nickname);

        // Set the presence status from the database
        if (invitation.presence_status) {
          setPresenceStatus(invitation.presence_status as PresenceStatus);
        } else {
          // If no status is set, default to null (no selection)
          setPresenceStatus(null);
        }

        // Send page open event
        if (code) {
          await sendPageOpenEvent(code);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("A apărut o eroare neașteptată");
        setIsLoading(false);
      }
    }

    handleInvitation();
  }, [code]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <div className="text-center">
          <div className="animate-bounce mb-6">
            <div className="text-6xl">🎉</div>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">
            Se încarcă invitația ta...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ups!</h1>
          <p className="text-lg text-gray-700 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-1 bg-beige relative overflow-x-hidden">
      <div className="h-2 w-full bg-black my-6"></div>

      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-sm h-full">
        <img
          src={blackRibbon}
          alt="Black ribbon decoration"
          className="h-auto w-48 mx-auto"
        />

        <div className="h-auto w-40 -my-14 -mx-16 relative">
          <img src={discoBall} alt="Disco ball decoration" />
          <img
            src={redStar}
            alt="Red star decoration"
            className="absolute top-8 left-32 w-10 transform -rotate-12"
          />
          <img
            src={redStar}
            alt="Red star decoration"
            className="absolute top-34 left-14 w-10 transform -rotate-12"
          />
        </div>

        <div className="absolute -right-3 top-40 transform rotate-10 flex gap-1">
          <img
            src={balloon2}
            alt="Balloon"
            className="w-8 h-12 transform rotate-8"
          />
          <img
            src={balloon3}
            alt="Balloon"
            className="w-8 h-13 transform rotate-4"
          />
        </div>

        <div className="absolute -left-3 top-130">
          <img src={her} alt="her" className="w-40 transform -rotate-10" />
          <img
            src={birthdayHat}
            alt="birthday hat"
            className="absolute -top-13 left-3 w-20 transform -rotate-10"
          />
        </div>

        <div className="absolute -right-8 top-63">
          <img src={lipstickKiss} alt="lipstick kiss" className="w-20" />
        </div>

        <div className="absolute -right-10 top-80">
          <img src={hibiscus} alt="hibiscus" className="w-20" />
        </div>

        <div className="absolute right-4 top-100">
          <img src={redMartini} alt="red martini" className="w-10" />
        </div>

        <div className="absolute right-8 top-150">
          <img src={discoBall} alt="disco ball" className="w-40" />
        </div>

        <div className="absolute left-33 top-130">
          <img src={xoxo} alt="xoxo" className="w-20" />
        </div>

        <div className="absolute right-20 top-140">
          <img
            src={discoCat}
            alt="disco cat"
            className="w-35 transform -scale-x-100"
          />
        </div>
      </div>

      {/* Page container */}
      <div className="absolute left-2 right-2 sm:left-1/2 top-40 sm:transform sm:-translate-x-1/2 sm:mx-0 sm:w-sm max-w-xs mx-auto">
        <div className="h-20 flex items-center justify-center gap-2">
          {/* Rocsi cutout container */}
          <img src={cutoutR} alt="R" className="w-10" />
          <img src={cutoutO} alt="O" className="w-10" />
          <img src={cutoutC} alt="C" className="w-10" />
          <img src={cutoutS} alt="S" className="w-10" />
          <div className="">
            <img src={cutoutI} alt="I" className="w-8 inline-block" />
            <div className="font-caveat text-5xl text-center inline-block align-bottom -mr-5">
              's
            </div>
          </div>
        </div>
        <div className="font-caveat text-5xl text-center">birthday</div>
        <div className="text-center font-courier-prime text-sm mt-7 px-10">
          it's my birthday and you're so invited. nu fac petrecere. doar dau un
          pretext bun să ne vedem.
        </div>
        <div className="text-center font-montserrat-alternates text-xl mt-3">
          <div className="relative text-center">
            {/* <div className="absolute left-0 right-0 anim-appear-variant-1">
              sâmbătă 23 august?
            </div> */}
            <div className="absolute left-0 right-0">duminicǎ 24 august</div>
          </div>
          <br />
          ora 17:00
          <br />
          the guild hall
        </div>
        <div className="mt-12 flex justify-end px-1 beige-shadow">
          <div className="font-courier-prime w-50">
            <div className="text-right">o să ajungi?</div>
            <RcsCheckbox
              className="justify-end mt-2"
              label="da! ne vedem"
              checked={presenceStatus === PresenceStatus.ATTENDING}
              onChange={() => setPresenceStatus(PresenceStatus.ATTENDING)}
              id="chk-sat"
            />
            <RcsCheckbox
              className="justify-end mt-2"
              label="nu..."
              checked={presenceStatus === PresenceStatus.NOT_ATTENDING}
              onChange={() => setPresenceStatus(PresenceStatus.NOT_ATTENDING)}
              id="chk-sun"
            />
            <div className="flex justify-end mt-3">
              <RcsButton
                className={
                  updateBtnState === "success"
                    ? "bg-green-300"
                    : updateBtnState === "error"
                      ? "bg-red-300"
                      : presenceStatus === null
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }
                noBg={
                  updateBtnState === "success" || updateBtnState === "error"
                }
                label={
                  presenceStatus === null
                    ? "confirmă"
                    : presenceStatus === PresenceStatus.NOT_ATTENDING
                      ? "confirmă :("
                      : "confirmă!"
                }
                onClick={handleUpdatePresence}
                isLoading={updateBtnState === "loading"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-black mt-190 mb-10"></div>
    </div>
  );
}
