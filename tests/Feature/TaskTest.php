<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_task()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->post(route('tasks.store'), [
            'title'       => 'Test Görevi',
            'description' => 'Test açıklaması',
        ]);

        $response->assertRedirect(route('tasks.index'));
        $this->assertDatabaseHas('tasks', [
            'title'   => 'Test Görevi',
            'user_id' => $user->id,
        ]);
    }

    public function test_guest_cannot_create_task()
    {
        $response = $this->post(route('tasks.store'), [
            'title'       => 'Test Görevi',
            'description' => 'Test açıklaması',
        ]);

        $response->assertRedirect(route('login'));
    }
}
