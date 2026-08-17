import { useEffect, useState } from "react";
import {
  IconPersonalBest,
  LogoSmall,
} from "../assets";
import { Clock3, Settings, RotateCcwIcon, XIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAudio, setTheme } from "../features/userSettings/settingSlice";

export type Theme = "dark" | "light";

const Header = () => {
  const result = useAppSelector((state) => state.result);
  const progress = useAppSelector((state) => state.progress);
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState("text");


  const bestScore = result?.history.reduce(
    (a, b) => {
      if (a.wpm > b.wpm) return a;
      return b;
    },
    { wpm: 0 }
  );


  useEffect(() => {
    const sess = localStorage.getItem('persist:root');
    if (sess) {
      const payload = JSON.parse(sess);
      const theme = JSON.parse(payload['settings'])['theme']
      document.documentElement.classList.add(theme);
    }
  }, [])


  const handleTheme = (theme: "light" | "dark") => {
    document.documentElement.classList.remove("light", "dark");
    dispatch(setTheme(theme))
    document.documentElement.classList.add(theme);
  };

  return (
    <section className="flex items-center justify-between p-8 sm:p-10 md:px-32">
      <div className="flex items-center gap-3">
        <img className="h-16 w-16 md:h-8 md:w-8" src={LogoSmall} alt="logo" />
        <h1 className="hidden sm:block text-foreground font-bold text-2xl">TypeMaster</h1>
      </div>

      <div className="flex items-stretch gap-3">
        <div className="flex min-h-11 items-center gap-4 rounded-sm border border-neutral-700/90 bg-neutral-800 px-3 sm:px-5 py-1">
          <p className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
            <img
              alt="Personal Best"
              className="h-4 w-4 hidden sm:block"
              src={IconPersonalBest}
            />
            <span>Best</span>
          </p>

          <h2 className="text-lg font-bold uppercase text-yellow-400">
            {bestScore!.wpm}{" "}
            <span className="text-[0.5rem] md:text-xs text-neutral-400">WPM</span>
          </h2>
        </div>

        <div className="flex min-h-11 items-center gap-1 rounded-sm border border-neutral-700/90 bg-neutral-800 px-2 py-2">
          <Sheet >
            <SheetTrigger disabled={progress?.begin}>
              <button
                disabled={progress?.begin}
                className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-600 disabled:hover:bg-neutral-900 disabled:hover:text-neutral-600"
              >
                <Clock3 className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" showCloseButton={false}>
              <div className="flex h-full min-h-0 flex-col">
                <SheetHeader className="static shrink-0 *:text-foreground">
                  <div className="flex items-center justify-between px-4">
                    <SheetTitle>
                      <div className="flex items-center gap-2">
                        <RotateCcwIcon className="text-foreground w-4 h-4" />
                        <h2 className="text-lg text-foreground font-bold">History</h2>
                      </div>
                    </SheetTitle>
                    <SheetClose
                      aria-label="Close history"
                      render={
                        <button className="flex h-8 w-8 items-center justify-center rounded-sm text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-foreground">
                          <XIcon className="h-4 w-4" />
                        </button>
                      }
                    />
                  </div>
                </SheetHeader>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-20 pt-0">
                  <Table className="mt-0 border-separate border-spacing-y-1">
                    <TableHeader className="sticky top-0 z-5 [&_th]:bg-neutral-800">
                      <TableRow>
                        <TableHead className="px-0 text-[0.65rem] font-semibold tracking-wide">Date</TableHead>
                        <TableHead className="text-[0.65rem] font-semibold tracking-wide">Mode</TableHead>
                        <TableHead className="text-center text-[0.65rem] font-semibold tracking-wide">wpm</TableHead>
                        <TableHead className="text-right text-[0.65rem] font-semibold tracking-wide">Acc</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {
                        result.history.length > 0 && (
                          result.history.map((v) => {
                            return (
                              <TableRow key={`${v.date}-${v.mode}-${v.wpm}-${v.acc}`} className="[&>td]:py-3.5">
                                <TableCell className="border-l-0 px-0 font-medium text-neutral-400">{v.date}</TableCell>
                                <TableCell className="text-neutral-400">{v.mode.replace(/s$/, "")}</TableCell>
                                <TableCell className="text-center font-bold text-foreground">{v.wpm}</TableCell>
                                <TableCell className={`border-r-0 text-right ${v.acc === 100 ? "text-yellow-400" : "text-neutral-400"}`}>{v.acc}%</TableCell>
                              </TableRow>
                            )
                          })
                        )
                      }
                    </TableBody>
                  </Table>
                </div>

                <SheetFooter className="border-b-2 border-b-blue-500">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-neutral-400">
                      TESTS TAKEN
                    </span>
                    <span className="text-sm font-bold text-foreground">{result.history.length}</span>
                  </div>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>

          <Dialog>
            <DialogTrigger disabled={progress?.begin}>
              <button
                disabled={progress?.begin}
                className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-foreground disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-600 disabled:hover:bg-neutral-900 disabled:hover:text-neutral-600"
              >
                <Settings className="h-5 w-5" />
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="uppercase text-foreground">Settings</DialogTitle>
              </DialogHeader>

              <div className="px-4 pb-4">
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Mode
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setMode("text")}
                        className={`flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${mode === "text"
                          ? "bg-white text-black"
                          : "border-neutral-700 text-neutral-400"
                          }`}
                      >
                        TEXT
                      </button>

                      <button
                        onClick={() => setMode("code")}
                        className={`flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${mode === "code"
                          ? "bg-white text-black"
                          : "border-neutral-700 text-neutral-400"
                          }`}
                      >
                        CODE
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Theme
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleTheme('dark')}
                        className={`flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${settings.theme === "dark"
                          ? "bg-white text-black"
                          : "border-neutral-700 text-neutral-400"
                          }`}
                      >
                        DARK
                      </button>

                      <button
                        onClick={() => handleTheme("light")}
                        className={`flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${settings.theme === "light"
                          ? "bg-white text-black"
                          : "border-neutral-700 text-neutral-400"
                          }`}
                      >
                        LIGHT
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Sound
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => dispatch(setAudio(true))}
                        className={`flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${settings.audio === true
                          ? "bg-white text-black"
                          : "border-neutral-700 text-neutral-400"
                          }`}
                      >
                        ON
                      </button>

                      <button
                        onClick={() => dispatch(setAudio(false))}
                        className={`flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${settings.audio === false
                          ? "bg-white text-black"
                          : "border-neutral-700 text-neutral-400"
                          }`}
                      >
                        MUTE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};


export default Header;
