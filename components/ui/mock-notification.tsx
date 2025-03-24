'use client'

import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { RxCross1 } from "react-icons/rx"

export default function MockNotification({ className, renderIcon, name, timeout }: any) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
        setShow(true)
    }, timeout)
  })

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className={`pointer-events-auto absolute w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0 ${className}`}>
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    { renderIcon() }
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-slate-500">{name}</p>
                    <p className="mt-1 text-sm text-gray-900 font-bold">Runtime error!</p>
                    <p className="mt-1 text-sm text-gray-900">Something wrong with your app</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShow(false)
                      }}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <RxCross1 aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
    </>
  )
}
