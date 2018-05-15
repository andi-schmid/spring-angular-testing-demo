package org.addressbook.facade;

import org.addressbook.domain.Person;
import org.addressbook.domain.PersonDomainService;
import org.addressbook.infrastructure.PersonRepository;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.transaction.Transactional;

@RunWith(SpringRunner.class)

// must not be used together with @SpringBootTest
@WebMvcTest(secure = false)

// @WebMvcTest disables full-autoconfiguration and configures only WebMvcTest relevant configurations.
// We want to use JPA Repositories, therefore we have to call these autoconfigurations ourselves.
@AutoConfigureDataJpa
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
@Transactional
public class PersonServiceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Sql(statements = {
            "insert into Person (id, version, firstname, lastname, street, zip, city, phone) " +
                    "values (1,0,'Felix','Meier','Effingerstr. 10','3000','Bern','+41 31 111 11 11')"
    })
    @Test
    public void findByPersonId() throws Exception {

        int personId = 1;

        mockMvc.perform(MockMvcRequestBuilders.get("/rest/persons/" + personId)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(personId)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.version", Matchers.is(0)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstname", Matchers.is("Felix")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastname", Matchers.is("Meier")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.street", Matchers.is("Effingerstr. 10")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.zip", Matchers.is("3000")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.city", Matchers.is("Bern")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone", Matchers.is("+41 31 111 11 11")));
    }

    @Sql(statements = {
            "insert into Person (id, version, firstname, lastname, street, zip, city, phone) " +
                    "values (1,0,'Felix','Meier','Effingerstr. 10','3000','Bern','+41 31 111 11 11')",
            "insert into Person (id, version, firstname, lastname, street, zip, city, phone) " +
                    "values (2,0,'Felix','Huber','Effingerstr. 15','3000', 'Bern','+41 31 222 22 22')"
    })
    @Test
    public void findByName() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/rest/persons?lastname=Meier")
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id", Matchers.is(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstname", Matchers.is("Felix")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastname", Matchers.is("Meier")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].zip", Matchers.is("3000")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].city", Matchers.is("Bern")));
    }

    @Configuration
    @ComponentScan(basePackageClasses = {PersonService.class, PersonDomainService.class})
    @EnableJpaRepositories(basePackageClasses = {PersonRepository.class})
    @EntityScan(basePackageClasses = Person.class)
    public static class TestConfig {
    }
}