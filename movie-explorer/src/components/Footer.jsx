import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#090b10] border-t border-white/5 pt-16 pb-12 px-6 sm:px-10 lg:px-20">
            <div className="max-w-[1700px] mx-auto">

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="text-2xl font-black tracking-[0.25em] text-white inline-block mb-6">
                            AGENCY
                        </Link>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
                            The ultimate cinematic experience for movie enthusiasts. Discover, track, 
                            and enjoy the latest releases and all-time classics in high definition.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Navigation</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-gray-500 tracking-wider">
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/">Home</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/movies">Movies</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/series">Series</Link></li>
                            <li className="hover:text-primary transition-colors cursor-pointer"><Link to="/watchlist">Watchlist</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Support</h4>
                        <ul className="flex flex-col gap-4 text-xs font-bold text-gray-500 tracking-wider">
                            <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Cookie Settings</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.2 2.238.2v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-74.96 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        © {currentYear} DevNest. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span>MADE with ❤️ BY</span>
                        <a 
                            href="https://www.github.com/emandoyesus" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all"
                        >
                            Emandoyesus
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
