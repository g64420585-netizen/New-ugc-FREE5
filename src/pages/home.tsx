import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Star, Flame, Sparkles, ChevronRight, Heart, Eye, ShoppingCart, Menu, X } from "lucide-react";
import imgCrown from "@assets/ugc-1_1781989534577.png";
import imgVisor from "@assets/ugc-2_1781989534626.png";
import imgWings from "@assets/ugc-3_1781989534534.png";
import imgShuriken from "@assets/ugc-4_1781989534482.png";
import imgSkull from "@assets/ugc-5_1781989534435.png";
import imgNecklace from "@assets/ugc-6_1781989534293.png";
import { logEvent } from "@/lib/logger";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "hats", label: "Hats" },
  { id: "faces", label: "Faces" },
  { id: "hair", label: "Hair" },
  { id: "accessories", label: "Accessories" },
  { id: "shirts", label: "Shirts" },
  { id: "pants", label: "Pants" },
];

const FEATURED_UGCS = [
  {
    id: 1,
    name: "Ruby Crown of Legends",
    creator: "RoyalItems",
    price: 750,
    robux: true,
    category: "hats",
    image: imgCrown,
    likes: 9100,
    views: 48000,
    trending: true,
    limited: true,
  },
  {
    id: 2,
    name: "Neon Cyber Visor",
    creator: "PixelCraft_UGC",
    price: 250,
    robux: true,
    category: "accessories",
    image: imgVisor,
    likes: 4820,
    views: 21300,
    trending: true,
    limited: false,
  },
  {
    id: 3,
    name: "Crimson Bat Wings",
    creator: "DragonForge",
    price: 500,
    robux: true,
    category: "accessories",
    image: imgWings,
    likes: 3400,
    views: 17800,
    trending: false,
    limited: false,
  },
  {
    id: 4,
    name: "Red Shuriken Pair",
    creator: "NinjaWorks_UGC",
    price: 180,
    robux: true,
    category: "accessories",
    image: imgShuriken,
    likes: 5600,
    views: 28900,
    trending: true,
    limited: false,
  },
  {
    id: 5,
    name: "Inferno Skull Crown",
    creator: "PixelCraft_UGC",
    price: 400,
    robux: true,
    category: "hats",
    image: imgSkull,
    likes: 7300,
    views: 39500,
    trending: true,
    limited: true,
  },
  {
    id: 6,
    name: "Thorn Ruby Necklace",
    creator: "CosmicWear",
    price: 320,
    robux: true,
    category: "accessories",
    image: imgNecklace,
    likes: 6700,
    views: 33200,
    trending: false,
    limited: false,
  },
];

const CREATORS = [
  { name: "PixelCraft_UGC", items: 42, followers: "12.4K" },
  { name: "NyanStudios", items: 87, followers: "34.1K" },
  { name: "RoyalItems", items: 19, followers: "8.7K" },
  { name: "CuteCraft_Co", items: 63, followers: "21.9K" },
];

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">BestUGCs</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Explore</a>
          <a href="#" className="hover:text-foreground transition-colors">Trending</a>
          <a href="#" className="hover:text-foreground transition-colors">Creators</a>
          <a href="#" className="hover:text-foreground transition-colors">Limited</a>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="hidden md:flex">Log In</Button>
          <Button size="sm" className="hidden md:flex">Sign Up</Button>
          <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">Explore</a>
          <a href="#" className="hover:text-primary transition-colors">Trending</a>
          <a href="#" className="hover:text-primary transition-colors">Creators</a>
          <a href="#" className="hover:text-primary transition-colors">Limited</a>
          <div className="flex gap-2 pt-1">
            <Button size="sm" variant="outline" className="flex-1">Log In</Button>
            <Button size="sm" className="flex-1">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function UGCCard({ item }: { item: typeof FEATURED_UGCS[0] }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group bg-card border border-card-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 cursor-pointer"
      onClick={() => logEvent("ugc_view", { name: item.name, creator: item.creator, price: item.price })}
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            el.parentElement!.classList.add("flex", "items-center", "justify-center");
            el.parentElement!.innerHTML = `<span class="text-4xl">🎮</span>`;
          }}
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {item.trending && (
            <Badge className="bg-orange-500 text-white border-0 text-[10px] px-1.5 py-0.5">
              <Flame className="w-2.5 h-2.5 mr-1" />Hot
            </Badge>
          )}
          {item.limited && (
            <Badge className="bg-yellow-500 text-black border-0 text-[10px] px-1.5 py-0.5">
              <Star className="w-2.5 h-2.5 mr-1" />Limited
            </Badge>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const nowLiked = !liked;
            setLiked(nowLiked);
            if (nowLiked) logEvent("ugc_like", { name: item.name, creator: item.creator });
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">by {item.creator}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            <span>{(item.views / 1000).toFixed(1)}K</span>
            <Heart className="w-3 h-3 ml-1" />
            <span>{(item.likes / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-sm text-primary">
            <span className="text-xs font-bold">R$</span>
            <span>{item.price}</span>
          </div>
        </div>
        <Button
          size="sm"
          className="w-full mt-2 h-7 text-xs gap-1"
          onClick={(e) => {
            e.stopPropagation();
            logEvent("ugc_buy_click", { name: item.name, creator: item.creator, price: item.price });
          }}
        >
          <ShoppingCart className="w-3 h-3" />
          Buy
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    logEvent("page_view", { page: "home" });
  }, []);

  const filtered = FEATURED_UGCS.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.creator.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background border-b border-border px-4 py-14 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <Badge variant="secondary" className="mb-4 gap-1">
            <TrendingUp className="w-3 h-3" />
            #1 Roblox UGC Community
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Discover the Best<br />
            <span className="text-primary">Roblox UGCs</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Browse, rate, and buy the top community-made items on Roblox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search UGCs or creators..."
                className="pl-9 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="h-10 px-5">Search</Button>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-sm">
            <div className="text-center">
              <p className="font-bold text-2xl">50K+</p>
              <p className="text-muted-foreground text-xs">UGC Items</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="font-bold text-2xl">8K+</p>
              <p className="text-muted-foreground text-xs">Creators</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="font-bold text-2xl">200K+</p>
              <p className="text-muted-foreground text-xs">Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Trending UGCs
          </h2>
          <Button variant="ghost" size="sm" className="text-sm gap-1 text-muted-foreground">
            View all <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((item) => (
              <UGCCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No UGCs found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}

        {/* Top Creators */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Top Creators
            </h2>
            <Button variant="ghost" size="sm" className="text-sm gap-1 text-muted-foreground">
              View all <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CREATORS.map((creator) => (
              <div key={creator.name} className="bg-card border border-card-border rounded-xl p-4 flex flex-col items-center text-center hover:border-primary/40 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary mb-2">
                  {creator.name[0]}
                </div>
                <p className="font-semibold text-sm truncate w-full">{creator.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{creator.items} items · {creator.followers} followers</p>
                <Button size="sm" variant="outline" className="mt-3 h-7 text-xs w-full">Follow</Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 px-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 font-bold text-foreground mb-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary-foreground" />
          </div>
          BestUGCs
        </div>
        <p>Community-driven Roblox UGC discovery. Not affiliated with Roblox Corporation.</p>
        <div className="flex justify-center gap-4 mt-3">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
