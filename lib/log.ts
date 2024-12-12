import { NODE_ENV } from "@/config";

export class Log {
    private static readonly defaultStyles = {
        info: 'color: blue;',
        warn: 'color: orange;',
        error: 'color: red; font-weight: bold;',
        success: 'color: green;'
    };

    private constructor() { }


    public static info(...v: any[]): void {
        Log._logWithStyle('info', ...v);
    }

    public static warn(...v: any[]): void {
        Log._logWithStyle('warn', ...v);
    }

    public static error(...v: any[]): void {
        Log._logWithStyle('error', ...v);
    }

    public static success(...v: any[]): void {
        Log._logWithStyle('success', ...v);
    }

    private static _logWithStyle(style: 'info' | 'warn' | 'error' | 'success', ...v: any[]): void {
        if (NODE_ENV === 'development') {
            console.log('%c' + `[${style}]` + v.join(' '), Log.defaultStyles[style]);
        }
    }
}