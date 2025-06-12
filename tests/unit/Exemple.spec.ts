import { describe, it, expect } from 'vitest'
import { MathService3 } from '#cmsadmin/core'

describe('MathService', (): void => {
  it('should add two numbers correctly', (): void => {
    const result: number = MathService3.add(2, 3)
    expect(result).toBe(5)
  })

  it('should subtract two numbers correctly', (): void => {
    const result: number = MathService3.subtract(5, 3)
    expect(result).toBe(2)
  })
})
