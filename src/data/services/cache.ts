class CacheService {

    private static _instancia?: CacheService;

    private constructor(){}

    public async get<T>(chave: string): Promise<T | undefined> {
        const valor = sessionStorage.getItem(chave);
        if(!!valor)
            return JSON.parse(valor) as T;
    }

    public async set<T>(chave: string, valor: T): Promise<void> {
        sessionStorage.setItem(chave, JSON.stringify(valor));
    }

    public async temChave(chave: string): Promise<boolean> {
        const valor = sessionStorage.getItem(chave);

        return !!valor;
    }

    public async remover(chave: string): Promise<void> {
        sessionStorage.removeItem(chave);
    }

    public async limpar(): Promise<void> {
        sessionStorage.clear();
    }

    public static singleton(): CacheService {
        if(!CacheService._instancia)
            CacheService._instancia = new CacheService();

        return CacheService._instancia;
    }
}

export { CacheService };
