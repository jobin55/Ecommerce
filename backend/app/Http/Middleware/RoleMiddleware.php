<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        if ($request->user()->role !== $role && $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden - You do not have permission to access this resource',
            ], 403);
        }

        return $next($request);
    }
}
