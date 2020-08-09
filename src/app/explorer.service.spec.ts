import { TestBed } from '@angular/core/testing';

import { ExplorerService } from './explorer.service';

describe('BlockchainService', () => {
  let service: ExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
