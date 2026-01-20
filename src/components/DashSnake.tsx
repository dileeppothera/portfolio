"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Gamepad2, X } from 'lucide-react';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 12;
const CELL_SIZE = 16;
const GAME_SPEED = 150;
const SWIPE_THRESHOLD = 30; // minimum swipe distance in pixels

export function DashSnake() {
    const [isOpen, setIsOpen] = useState(false);
    const [snake, setSnake] = useState<Position[]>([{ x: 6, y: 6 }]);
    const [food, setFood] = useState<Position>({ x: 3, y: 3 });
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const directionRef = useRef<Direction>(direction);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const generateFood = useCallback((): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, [snake]);

    const resetGame = useCallback(() => {
        setSnake([{ x: 6, y: 6 }]);
        setFood({ x: 3, y: 3 });
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        setGameOver(false);
        setScore(0);
        setIsPaused(true);
    }, []);

    const changeDirection = useCallback((newDirection: Direction) => {
        const opposites: Record<Direction, Direction> = {
            UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
        };

        if (opposites[newDirection] !== directionRef.current) {
            directionRef.current = newDirection;
            setDirection(newDirection);
            if (isPaused) setIsPaused(false);
        }
    }, [isPaused]);

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake(prevSnake => {
            const head = { ...prevSnake[0] };
            const currentDirection = directionRef.current;

            switch (currentDirection) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                return prevSnake;
            }

            // Self collision
            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [food, gameOver, isPaused, generateFood]);

    useEffect(() => {
        if (isOpen && !isPaused && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isOpen, isPaused, gameOver, moveSnake]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen || gameOver) return;

            const keyMap: Record<string, Direction> = {
                ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
                w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
            };

            const newDirection = keyMap[e.key];
            if (newDirection) {
                e.preventDefault();
                changeDirection(newDirection);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, gameOver, changeDirection]);

    // Touch/Swipe controls
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchStartRef.current || gameOver) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        // Only register if swipe is long enough
        if (Math.max(absX, absY) < SWIPE_THRESHOLD) {
            touchStartRef.current = null;
            return;
        }

        let newDirection: Direction;
        if (absX > absY) {
            // Horizontal swipe
            newDirection = deltaX > 0 ? 'RIGHT' : 'LEFT';
        } else {
            // Vertical swipe
            newDirection = deltaY > 0 ? 'DOWN' : 'UP';
        }

        changeDirection(newDirection);
        touchStartRef.current = null;
    }, [gameOver, changeDirection]);

    const gameWidth = GRID_SIZE * CELL_SIZE;
    const gameHeight = GRID_SIZE * CELL_SIZE;

    return (
        <div className="relative">
            {/* Collapsed: Small button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted/50 hover:text-white/70 transition-colors group"
                    title="Play Dash Snake"
                >
                    <Gamepad2 size={14} className="group-hover:animate-pulse" />
                    <span className="hidden md:inline">Play</span>
                </button>
            )}

            {/* Expanded: Game panel */}
            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/95 border border-white/10 rounded-lg p-3 shadow-2xl z-50">
                    <div className="flex items-center justify-between mb-2 gap-4">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Dash Snake</span>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] uppercase tracking-widest text-cyan-400">{score}</span>
                            <button onClick={() => { setIsOpen(false); resetGame(); }} className="text-white/30 hover:text-white">
                                <X size={12} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={gameAreaRef}
                        className="relative bg-[#0a1628] rounded border border-white/5 touch-none"
                        style={{ width: gameWidth, height: gameHeight }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Snake */}
                        {snake.map((segment, i) => (
                            <div
                                key={i}
                                className={`absolute rounded-sm ${i === 0 ? 'bg-cyan-400' : 'bg-cyan-600'}`}
                                style={{
                                    left: segment.x * CELL_SIZE,
                                    top: segment.y * CELL_SIZE,
                                    width: CELL_SIZE - 1,
                                    height: CELL_SIZE - 1,
                                }}
                            />
                        ))}

                        {/* Food */}
                        <div
                            className="absolute bg-red-500 rounded-full animate-pulse"
                            style={{
                                left: food.x * CELL_SIZE + 2,
                                top: food.y * CELL_SIZE + 2,
                                width: CELL_SIZE - 4,
                                height: CELL_SIZE - 4,
                            }}
                        />

                        {/* Game Over / Paused overlay */}
                        {(gameOver || isPaused) && (
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest text-white/80">
                                    {gameOver ? 'Game Over' : 'Paused'}
                                </span>
                                <button
                                    onClick={gameOver ? resetGame : () => setIsPaused(false)}
                                    className="text-[9px] uppercase tracking-widest border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors"
                                >
                                    {gameOver ? 'Retry' : 'Resume'}
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-[8px] uppercase tracking-widest text-white/20 mt-2 text-center">
                        Swipe or use arrow keys
                    </p>
                </div>
            )}
        </div>
    );
}
