<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Görevin sahibi
            $table->string('title');               // Görev başlığı
            $table->text('description')->nullable(); // Görev açıklaması
            $table->boolean('completed')->default(false); // Tamamlanma durumu
            $table->timestamps();

            // Kullanıcı ile ilişki: kullanıcı silindiğinde görevleri de silinir.
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
