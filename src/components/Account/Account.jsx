import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import Avatar from "../Avatar";
import { i18n }from "../../ES-EN"

export default function Account({ session }) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`username, website, avatar_url`)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("profiles").upsert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-widget">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({ username, website, avatar_url: url });
                }}
            />
            <div>
                <label htmlFor="email">{i18n.t("email")}</label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username">{i18n.t("name")}</label>
                <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">{i18n.t("website")}</label>
                <input
                    id="website"
                    type="website"
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button block primary"
                    onClick={() =>
                        updateProfile({ username, website, avatar_url })
                    }
                    disabled={loading}
                >
                    {loading ? i18n.t("loading") : i18n.t("update")}
                </button>
            </div>
        </div>
    );
}
