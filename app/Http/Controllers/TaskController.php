<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Tüm metotlar için auth middleware uyguluyoruz.
    public function __construct()
    {
        $this->middleware('auth');
    }

    // 1. Index: Kullanıcının tüm görevlerini listeler.
    public function index()
    {
        // Sadece giriş yapmış kullanıcının görevlerini çekiyoruz.
        $tasks = auth()->user()->tasks()->latest()->get();
        return view('tasks.index', compact('tasks'));
    }

    // 2. Create: Yeni görev ekleme formunu gösterir.
    public function create()
    {
        return view('tasks.create');
    }

    // 3. Store: Yeni görevi veritabanına ekler.
    public function store(Request $request)
    {
        // Validation: Başlık zorunlu, açıklama isteğe bağlı.
        $request->validate([
            'title'       => 'required|max:255',
            'description' => 'nullable',
        ]);

        auth()->user()->tasks()->create($request->only('title', 'description'));

        return redirect()->route('tasks.index')->with('success', 'Görev oluşturuldu.');
    }

    // 4. Edit: Mevcut görevi düzenleme formunu gösterir.
    public function edit(Task $task)
    {
        // Yalnızca kendi görevini düzenleyebilsin.
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        return view('tasks.edit', compact('task'));
    }

    // 5. Update: Görevi günceller.
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'title'       => 'required|max:255',
            'description' => 'nullable',
        ]);

        $task->update($request->only('title', 'description'));

        return redirect()->route('tasks.index')->with('success', 'Görev güncellendi.');
    }

    // 6. Destroy: Görevi siler.
    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Görev silindi.');
    }

    // 7. Complete: Görevin tamamlanma durumunu günceller.
    public function complete(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update(['completed' => true]);

        return redirect()->route('tasks.index')->with('success', 'Görev tamamlandı.');
    }
}
