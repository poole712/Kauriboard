import { useNavigate, useSearchParams } from "react-router";
import { acceptinvite } from "../services/authService";

export default function InvitePage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    async function AcceptInvite() {
        const response = await acceptinvite(token!);
        console.log(token);
        if(response.ok) {
            navigate("/pages/Projects");
        } else {
            alert("Failed to accept invite: " + response.error);
        }
    }

    return (
        <div>
            <h1>Invite Page</h1>
            <p>Token: {token}</p>
            <button className="btn btn-primary" onClick={AcceptInvite}>
                Accept Invite
            </button>
        </div>
    );
}

