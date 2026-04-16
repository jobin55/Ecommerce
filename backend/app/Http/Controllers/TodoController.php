<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class TodoController extends Controller
{
    #[OA\Get(
        path: '/api/todos',
        operationId: 'getTodosList',
        tags: ['Todos'],
        summary: 'Get list of tasks',
        description: 'Returns a list of all Todo items',
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful operation',
                content: new OA\JsonContent(type: 'array', items: new OA\Items(
                    properties: [
                        new OA\Property(property: 'id', type: 'integer', example: 1),
                        new OA\Property(property: 'title', type: 'string', example: 'Buy groceries'),
                        new OA\Property(property: 'description', type: 'string', nullable: true, example: 'Milk, bread, and eggs'),
                        new OA\Property(property: 'is_completed', type: 'boolean', example: false),
                        new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                        new OA\Property(property: 'updated_at', type: 'string', format: 'date-time')
                    ]
                ))
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        // Admins can see all todos, regular users see only their own
        if ($request->user()->isAdmin()) {
            $todos = Todo::orderBy('created_at', 'desc')->get();
        } else {
            $todos = Todo::where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }
        return response()->json($todos);
    }

    #[OA\Post(
        path: '/api/todos',
        operationId: 'storeTodo',
        tags: ['Todos'],
        summary: 'Create new Todo',
        description: 'Creates a new Todo item and returns it',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['title'],
                properties: [
                    new OA\Property(property: 'title', type: 'string', maxLength: 255, example: 'Buy groceries'),
                    new OA\Property(property: 'description', type: 'string', nullable: true, example: 'Supermarket visit')
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Created successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'id', type: 'integer', example: 1),
                        new OA\Property(property: 'title', type: 'string', example: 'Buy groceries'),
                        new OA\Property(property: 'description', type: 'string', nullable: true, example: 'Supermarket visit'),
                        new OA\Property(property: 'is_completed', type: 'boolean', example: false),
                        new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                        new OA\Property(property: 'updated_at', type: 'string', format: 'date-time')
                    ]
                )
            ),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todo = Todo::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);
        return response()->json($todo, 201);
    }

    #[OA\Get(
        path: '/api/todos/{todo}',
        operationId: 'getTodoById',
        tags: ['Todos'],
        summary: 'Get Todo details',
        description: 'Returns a single Todo item',
        parameters: [
            new OA\Parameter(
                name: 'todo',
                description: 'Todo ID',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful operation',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'id', type: 'integer', example: 1),
                        new OA\Property(property: 'title', type: 'string', example: 'Buy groceries'),
                        new OA\Property(property: 'description', type: 'string', nullable: true, example: 'Supermarket visit'),
                        new OA\Property(property: 'is_completed', type: 'boolean', example: false),
                        new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                        new OA\Property(property: 'updated_at', type: 'string', format: 'date-time')
                    ]
                )
            ),
            new OA\Response(response: 404, description: 'Todo not found')
        ]
    )]
    public function show(Request $request, Todo $todo): JsonResponse
    {
        // Check if user can view this todo
        if (!$request->user()->isAdmin() && $todo->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return response()->json($todo);
    }

    #[OA\Put(
        path: '/api/todos/{todo}',
        operationId: 'updateTodo',
        tags: ['Todos'],
        summary: 'Update existing Todo',
        description: 'Updates an existing Todo item',
        parameters: [
            new OA\Parameter(
                name: 'todo',
                description: 'Todo ID',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer')
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'title', type: 'string', maxLength: 255, example: 'Buy groceries updated'),
                    new OA\Property(property: 'description', type: 'string', nullable: true, example: 'Updated description'),
                    new OA\Property(property: 'is_completed', type: 'boolean', example: true)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Updated successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'id', type: 'integer', example: 1),
                        new OA\Property(property: 'title', type: 'string', example: 'Buy groceries updated'),
                        new OA\Property(property: 'description', type: 'string', nullable: true, example: 'Updated description'),
                        new OA\Property(property: 'is_completed', type: 'boolean', example: true),
                        new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                        new OA\Property(property: 'updated_at', type: 'string', format: 'date-time')
                    ]
                )
            ),
            new OA\Response(response: 404, description: 'Todo not found'),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function update(Request $request, Todo $todo): JsonResponse
    {
        // Check if user can update this todo
        if (!$request->user()->isAdmin() && $todo->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
        ]);

        $todo->update($validated);
        return response()->json($todo);
    }

    #[OA\Delete(
        path: '/api/todos/{todo}',
        operationId: 'deleteTodo',
        tags: ['Todos'],
        summary: 'Delete Todo',
        description: 'Deletes a specified Todo item',
        parameters: [
            new OA\Parameter(
                name: 'todo',
                description: 'Todo ID',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Deleted successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Todo deleted successfully')
                    ]
                )
            ),
            new OA\Response(response: 404, description: 'Todo not found')
        ]
    )]
    public function destroy(Request $request, Todo $todo): JsonResponse
    {
        // Check if user can delete this todo
        if (!$request->user()->isAdmin() && $todo->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $todo->delete();
        return response()->json(['message' => 'Todo deleted successfully']);
    }
}