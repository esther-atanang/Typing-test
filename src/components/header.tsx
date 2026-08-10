import React, { useState } from "react";
import { IconNewPb, IconPersonalBest, LogoLarge, LogoSmall, Scroll } from "../assets";
import { Clock3, Settings, RotateCcwIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const Header = () => {
  const [mode, setMode] = useState('text');
  const [theme, setTheme] = useState('dark');
  const [sound, setSound] = useState('on');
  return (
    <section className="flex items-center justify-between p-10 md:px-32">
      <div className="flex items-center gap-3">
        <img src={LogoLarge} alt="logo" />
      </div>

      <div className="flex items-stretch gap-3">
        <div className="flex min-h-11 items-center  *:cursor-pointer gap-4 rounded-sm border border-neutral-700/90 bg-neutral-800 px-5 py-2">
          <p className="uppercase text-xs tracking-[0.2em] text-neutral-400 flex items-center gap-1"> <img alt="Personal Best" className="w-4 h-4" src={IconPersonalBest}/> Best</p>
          <h2 className="text-lg font-bold text-yellow-400 uppercase">41 <span className="text-neutral-400 text-xs">WPM</span></h2>
        </div>

        <div className="flex min-h-11 items-center gap-1 rounded-sm border border-neutral-700/90 bg-neutral-800 px-2 py-2">
          <Sheet>
            <SheetTrigger>
              <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white">
                <Clock3 className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="*:text-white">
                <SheetTitle>
                  <div className="px-4 flex items-center gap-2">
                    {/* <img className="h-6 w-6" src={Scroll} alt="scroll" /> */}
                    <RotateCcwIcon/>
                    <h2 className="text-lg font-bold">History</h2>
                  </div>

                </SheetTitle>
              </SheetHeader>
              <div className="-mt-4 px-4 pb-4 pt-0">
                <Table className="mt-0">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>wpm</TableHead>
                      <TableHead className="text-right">Acc</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jul 24</TableCell>
                      <TableCell>60</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell className="text-right">0%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <SheetFooter className="bg-neutral-700/30">
                <div className="flex w-full items-center justify-between">
                  <span className="uppercase text-xs tracking-wider text-neutral-400">TESTS TAKEN</span>
                  <span className="text-sm font-bold text-white">1</span>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>


          <Dialog>
            <DialogTrigger>   <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-white">
              <Settings className="h-5 w-5" />
            </button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="uppercase">Settings</DialogTitle>
              </DialogHeader>
              <div className="px-4 pb-4">
                <div className="space-y-6">
                  <div>
                    <p className="uppercase text-xs tracking-[0.2em] text-neutral-400 mb-3">Mode</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setMode("text")}
                        className={
                          `flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${
                            mode === "text"
                              ? "bg-white text-black"
                              : "border-neutral-700 text-neutral-400"
                          }`
                        }
                      >
                        TEXT
                      </button>
                      <button
                        onClick={() => setMode("code")}
                        className={
                          `flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${
                            mode === "code"
                              ? "bg-white text-black"
                              : "border-neutral-700 text-neutral-400"
                          }`
                        }
                      >
                        CODE
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="uppercase text-xs tracking-[0.2em] text-neutral-400 mb-3">Theme</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setTheme("dark")}
                        className={
                          `flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${
                            theme === "dark"
                              ? "bg-white text-black"
                              : "border-neutral-700 text-neutral-400"
                          }`
                        }
                      >
                        DARK
                      </button>
                      <button
                        onClick={() => setTheme("light")}
                        className={
                          `flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${
                            theme === "light"
                              ? "bg-white text-black"
                              : "border-neutral-700 text-neutral-400"
                          }`
                        }
                      >
                        LIGHT
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="uppercase text-xs tracking-[0.2em] text-neutral-400 mb-3">Sound</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSound("on")}
                        className={
                          `flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${
                            sound === "on"
                              ? "bg-white text-black"
                              : "border-neutral-700 text-neutral-400"
                          }`
                        }
                      >
                        ON
                      </button>
                      <button
                        onClick={() => setSound("mute")}
                        className={
                          `flex-1 rounded-sm border px-4 py-2 text-sm font-medium ${
                            sound === "mute"
                              ? "bg-white text-black"
                              : "border-neutral-700 text-neutral-400"
                          }`
                        }
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
