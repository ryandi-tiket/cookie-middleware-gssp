import { NextMiddleware, NextResponse } from 'next/server'

export const middleware: NextMiddleware = (request, event) => {
  let res = NextResponse.next()

  res.cookie('hello', 'world')

  return res
}
