import { TestBed, inject } from '@angular/core/testing';

import { CliProdService } from './cli-prod.service';

describe('CliProdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CliProdService]
    });
  });

  it('should be created', inject([CliProdService], (service: CliProdService) => {
    expect(service).toBeTruthy();
  }));
});
