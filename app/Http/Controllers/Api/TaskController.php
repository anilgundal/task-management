<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // API'ye erişimde kullanıcı doğrulaması yapılmalı.
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Listeleme: Sadece kullanıcının görevleri
    public function index()
    {
        $tasks = auth()->user()->tasks()->latest()->get();
        return response()->json($tasks);
    }

    // Oluşturma
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|max:255',
            'description' => 'nullable',
        ]);

        $task = auth()->user()->tasks()->create($request->only('title', 'description'));

        return response()->json($task, 201);
    }

    // Gösterme
    public function show(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return response()->json($task);
    }

    // Güncelleme
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title'       => 'required|max:255',
            'description' => 'nullable',
        ]);

        $task->update($request->only('title', 'description'));

        return response()->json($task);
    }

    // Silme
    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    // Görevi tamamlama
    public function complete(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->update(['completed' => true]);

        return response()->json($task);
    }
}
