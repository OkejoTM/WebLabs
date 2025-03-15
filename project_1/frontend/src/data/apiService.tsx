import { Game } from './gameType';
import { Category } from './categoryType';

export class ApiService {
    static baseUrl = process.env.BACKEND_HOST + "/api"; 
  
    // Получение токена
    static getToken(): string | null {
      return localStorage.getItem("token");
    }
  
    // Общий метод для выполнения запросов
    static async request<T>(
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
      body?: any
    ): Promise<T> {
      const token = this.getToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
  
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
  
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          message: errorData.message || "Ошибка запроса",
          status: response.status
        };
      }
      // console.log("Base url ", this.baseUrl);
      // console.log("env ", process.env.BACKEND_HOST);
      return await response.json();
    }
  
    // --- Игры ---
  
    static async getGameById(id: number): Promise<Game> {
      return await this.request<Game>(`/games/${id}`);
    }
  
    static async createGame(game: Partial<Game>): Promise<Game> {
      return await this.request<Game>("/games", "POST", game);
    }
  
    static async updateGame(id: number, game: Partial<Game>): Promise<Game> {
      return await this.request<Game>(`/games/${id}`, "PUT", game);
    }
  
    static async deleteGame(id: number): Promise<void> {
      await this.request<void>(`/games/${id}`, "DELETE");
    }
  
    // --- Категории ---
  
    static async getGamesByCategoryId(categoryId: number): Promise<Game[]> {
      return await this.request<Game[]>(`/categories/${categoryId}/games`);
    }
  
    static async getCategories(): Promise<Category[]> {
      return await this.request<Category[]>("/categories");
    }
  
    static async getCategoryById(id: number): Promise<Category> {
      return await this.request<Category>(`/categories/${id}`);
    }
  
    static async createCategory(category: Partial<Category>): Promise<Category> {
      return await this.request<Category>("/categories", "POST", category);
    }
  
    static async updateCategory(
      id: number,
      category: Partial<Category>
    ): Promise<Category> {
      return await this.request<Category>(`/categories/${id}`, "PUT", category);
    }
  
    static async deleteCategory(id: number): Promise<void> {
      await this.request<void>(`/categories/${id}`, "DELETE");
    }
  
    // --- Авторизация ---
  
    static async login(username: string, password: string): Promise<{ token: string }> {
      const response = await this.request<{ token: string }>("/auth/login", "POST", {
        username,
        password,
      });
      localStorage.setItem("token", response.token);
      return response;
    }
  
    static async register(
      username: string,
      password: string
    ): Promise<{ message: string }> {
      return await this.request<{ message: string }>("/auth/register", "POST", {
        username,
        password,
      });
    }
  
    static logout(): void {
      localStorage.removeItem("token");
    }
  }