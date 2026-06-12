package com.shopproject.returns;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "/returns")
public class ReturnsController
{
    private final ReturnsRepository returnsRepository;


    public ReturnsController(ReturnsRepository returnsRepository)
    {
        this.returnsRepository = returnsRepository;
    }


    @GetMapping
    public List<ReturnRequestEntity> findAll()
    {
        return returnsRepository.findAll();
    }


    @PostMapping
    public ReturnRequestEntity save(@RequestBody ReturnRequestEntity returnRequestEntity)
    {
        return returnsRepository.save(returnRequestEntity);
    }


    @GetMapping(path = "/{id}")
    public ReturnRequestEntity findById(@PathVariable UUID id)
    {
        return this.returnsRepository.findById(id)
                .orElseThrow(() -> new ReturnNotFoundException(id));
    }
}
