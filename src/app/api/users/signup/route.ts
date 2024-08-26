import { NextResponse } from "next/server";
import { userActions } from "../route"

export async function POST(req: Request){
 return userActions(req, 'add');
}