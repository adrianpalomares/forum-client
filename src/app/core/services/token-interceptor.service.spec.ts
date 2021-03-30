import { TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';

import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
    let service: TokenInterceptorService;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [AppModule] });
        service = TestBed.inject(TokenInterceptorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
