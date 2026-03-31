import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "", username: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            email: formData.email,
            username: isLogin ? formData.email.split('@')[0] : formData.username,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${formData.email}`
        };

        login(userData);
        navigate("/");
    };

    return (
        <div className="bg-background min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            
            {/* Background Blur Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg">
                
                {/* Brand / Logo */}
                <div className="text-center mb-12">
                    <Link to="/" className="text-4xl font-black tracking-[0.4em] text-white inline-block hover:text-primary transition-colors">
                        AXORA
                    </Link>
                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.4em] mt-4 border-b border-white/5 pb-6 inline-block px-10">Premium Experience</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 lg:p-14 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                    
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            {isLogin ? "Welcome   Back" : "Join   Axora"}
                        </h2>
                        <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em]">{isLogin ? "Access your premium watchlist" : "Start your cinematic journey"}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        {!isLogin && (
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-4">Username</label>
                                <input
                                    type="text"
                                    required={!isLogin}
                                    placeholder="SELECT USERNAME"
                                    className="bg-white/5 border border-white/5 rounded-full px-8 py-5 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all focus:bg-white/10"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-4">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="ENTER YOUR EMAIL"
                                className="bg-white/5 border border-white/5 rounded-full px-8 py-5 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all focus:bg-white/10"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-4">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="bg-white/5 border border-white/5 rounded-full px-8 py-5 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all focus:bg-white/10"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {isLogin && (
                            <div className="text-right">
                                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors">Forgot Password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-6 bg-primary text-black font-black uppercase tracking-[0.3em] py-6 rounded-full text-xs shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                        >
                            {isLogin ? "Authenticate" : "Create Account"}
                        </button>

                    </form>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-gray-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest"
                        >
                            {isLogin ? "Don't have an account? Join Now" : "Already have an account? Login"}
                        </button>
                    </div>

                </div>

                <div className="mt-12 text-center opacity-30">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-500 leading-relaxed">
                        Axora Premium Cinematics &bullet; Secure Authentication Protocol<br />
                        &copy; {new Date().getFullYear()} AXORA MEDIA GROUP. All rights reserved.
                    </p>
                </div>

            </div>
        </div>
    );
}
