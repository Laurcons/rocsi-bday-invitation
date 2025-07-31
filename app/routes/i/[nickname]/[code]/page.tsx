import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../../../lib/supabase";

export function meta() {
  return [
    { title: "Invitație - Ziua Rocsi" },
    { name: "description", content: "Invitația ta la ziua Rocsi" },
  ];
}

export default function InvitationPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleInvitation() {
      if (!code) {
        setError("Link de invitație invalid");
        setLoading(false);
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
          setLoading(false);
          return;
        }

        if (!invitationData || invitationData.length === 0) {
          setError("Cod de invitație invalid");
          setLoading(false);
          return;
        }

        // Get the nickname from the returned record
        const invitation = invitationData[0];
        setUserNickname(invitation.nickname);
        setLoading(false);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("A apărut o eroare neașteptată");
        setLoading(false);
      }
    }

    handleInvitation();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ups!</h1>
          <p className="text-lg text-gray-700 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with confetti effect */}
        <div className="text-center mb-8">
          <div className="animate-bounce mb-4">
            <div className="text-8xl">🎂</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Ziua Mea!
          </h1>
          <div className="flex justify-center space-x-2 text-2xl">
            <span className="animate-pulse">🎈</span>
            <span className="animate-pulse delay-100">🎊</span>
            <span className="animate-pulse delay-200">🎈</span>
          </div>
        </div>

        {/* Main invitation card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            {userNickname && (
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Salut,{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {userNickname}
                  </span>
                  !
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Ești invitat la ziua mea.
                </p>
              </div>
            )}

            <div className="space-y-4 text-lg md:text-xl text-gray-700">
              <p>
                Te aștept{" "}
                <span className="font-bold text-purple-600">
                  sâmbătă, 23 august
                </span>
              </p>
              <p>
                la{" "}
                <span className="font-bold text-pink-600">The Guild Hall</span>
              </p>
              <p>
                ora <span className="font-bold text-blue-600">19:00</span>
              </p>
              <p className="text-lg md:text-xl font-semibold text-purple-700 mt-6">
                să jucăm un{" "}
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-bold">
                  Secret Hitler
                </span>{" "}
                împreună!
              </p>
            </div>
          </div>
        </div>

        {/* Fun elements */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4 text-3xl">
            <span className="animate-bounce">🎮</span>
            <span className="animate-bounce delay-75">🎭</span>
            <span className="animate-bounce delay-150">🍕</span>
            <span className="animate-bounce delay-200">🥤</span>
          </div>

          <p className="text-gray-600 font-medium">Va fi distractiv! 🎉</p>
        </div>

        {/* RSVP button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 font-bold text-lg shadow-lg"
          >
            Confirmă participarea! ✅
          </button>
        </div>
      </div>
    </div>
  );
}
