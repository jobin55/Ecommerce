<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    description: "Swagger OpenApi description for our Laravel backend.",
    title: "Laravel DDEV API Documentation",
    contact: new OA\Contact(email: "developer@example.com")
)]
#[OA\Server(
    url: L5_SWAGGER_CONST_HOST,
    description: "Local Environment Server"
)]
abstract class Controller
{
    #[OA\Get(
        path: '/api/healthcheck',
        operationId: 'healthcheck',
        description: 'Healthcheck endpoint',
        responses: [
            new OA\Response(response: 200, description: 'OK')
        ]
    )]
    public function healthcheck()
    {
        return response()->json(['status' => 'ok']);
    }
}
